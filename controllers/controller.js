const openai = require("../openai/openai");
const { extractPDFData, extractWebData } = require("./dataUtils");
const Data = require("../models/Data");
const axios = require("axios");

async function askQuestion(req, res) {
  try {
    const userQuestion = req.body.question;

    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: userQuestion,
        max_tokens: 50,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "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",
        },
      }
    );

    const generatedResponse = response.data.choices[0].text.trim();
    await saveResponseToDB(userQuestion, generatedResponse);

    res.json({ response: generatedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function saveExtractedDataToDB(
  type,
  source,
  extractedData,
  questionsAsked,
  responses
) {
  try {
    // Convert extractedData to string format if it's an object or an array
    const extractedText =
      Array.isArray(extractedData) || typeof extractedData === "object"
        ? JSON.stringify(extractedData)
        : extractedData;

    await Data.create({
      sourceType: type,
      sourceContent: source,
      extractedText: extractedText,
      questionsAsked: questionsAsked,
      responses: responses,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error saving extracted data to the database");
  }
}

async function extractAndStoreData(req, res) {
  try {
    const { type, source } = req.body;
    let extractedData;

    if (type === "pdf") {
      extractedData = await extractPDFData(source);
    } else if (type === "web") {
      extractedData = await extractWebData(source);
    }

    await saveExtractedDataToDB(type, source, extractedData);

    res.json({ message: "Data extracted and stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getResponses(req, res) {
  try {
    const responses = await getResponsesFromDB();
    res.json({ responses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { askQuestion, extractAndStoreData, getResponses };
