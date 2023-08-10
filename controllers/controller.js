const { Configuration, OpenAIApi } = require("openai");
const { extractPDFData, extractWebData } = require("./dataUtils");
const Data = require("../models/Data");
const axios = require("axios");

const apiKey = "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";

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function askQuestion(req, res) {
  try {
    const userQuestion = req.body.question; // Extract the user's question

    // Fetch relevant data from your database based on the user's question
    const relevantDataFromDB = await fetchRelevantDataFromDB(userQuestion);

    // Use the relevant data as a prompt for OpenAI API
    const openaiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: relevantDataFromDB,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const generatedResponse = openaiResponse.data.choices[0].text.trim();

    res.json({ response: generatedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function fetchRelevantDataFromDB(userQuestion) {
  try {
    // Fetch all entries from the database
    const allData = await Data.findAll();
    console.log(allData);

    // Iterate through each entry and check if the user's question is relevant
    const relevantData = [];
    for (const entry of allData) {
      const extractedText = entry.extractedText;
      if (extractedText.includes(userQuestion)) {
        relevantData.push(extractedText);
      }
    }

    // Combine relevant data into a single string
    const combinedRelevantData = relevantData.join("\n");

    return combinedRelevantData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching relevant data from the database");
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
