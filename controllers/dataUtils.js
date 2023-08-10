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
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  // Use cheerio to extract data from the webpage
  // Example: const extractedData = $('selector').text();
  return extractedData;
}

module.exports = { extractPDFData, extractWebData };
