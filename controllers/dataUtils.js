const axios = require('axios');
const pdf = require('pdf-parse');
const cheerio = require('cheerio');

async function extractPDFData(pdfUrl) {
  const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');
  const pdfData = await pdf(buffer);
  return pdfData.text;
}

async function extractWebData(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const extractedData = [];
    $('p').each((index, element) => {
      extractedData.push($(element).text());
    });

    return extractedData;
  } catch (error) {
    console.error('Error extracting web data:', error);
    throw error;
  }
}

module.exports = { extractPDFData, extractWebData };
