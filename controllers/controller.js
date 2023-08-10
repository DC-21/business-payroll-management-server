const { extractPDFData, extractWebData } = require("./dataUtils");
const Data = require("../models/Data");;
const axios = require("axios");

const model = langchain.loadModel("my_model");
async function askQuestion(question) {
    const response = await model.generate(question);
    return response;
  }
  const question = "What is the auth";
  async function answer(){const response = await askQuestion(question);
  
  console.log(response);  }

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

module.exports = { extractAndStoreData};
