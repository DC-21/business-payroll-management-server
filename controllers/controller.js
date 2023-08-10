const openai = require('../openai/openai');
const { extractPDFData, extractWebData } = require('./dataUtils');
const { saveResponseToDB, saveExtractedDataToDB } = require('../utils/db');

async function askQuestion(req, res) {
  try {
    const userQuestion = req.body.question;
    const openaiResponse = await openai.complete({
      prompt: userQuestion,
      max_tokens: 50,
    });

    const generatedResponse = openaiResponse.choices[0].text.trim();
    await saveResponseToDB(userQuestion, generatedResponse);

    res.json({ response: generatedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function extractAndStoreData(req, res) {
  try {
    const { type, source } = req.body;
    let extractedData;

    if (type === 'pdf') {
      extractedData = await extractPDFData(source);
    } else if (type === 'web') {
      extractedData = await extractWebData(source);
    }

    await saveExtractedDataToDB(extractedData);

    res.json({ message: 'Data extracted and stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getResponses(req, res) {
    try {
      const responses = await getResponsesFromDB();
      res.json({ responses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = { askQuestion, extractAndStoreData, getResponses };
