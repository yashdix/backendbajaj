const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST Endpoint - /bfhl
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  // Validate that data is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid data format. Data should be an array.',
    });
  }

  // Extract numbers and alphabets
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
  const highestLowercaseAlphabet = alphabets
    .filter(item => item === item.toLowerCase())
    .sort()
    .pop() || '';

  // Handle file validation
  const fileValid = file_b64 ? true : false;
  const fileMimeType = fileValid ? 'application/pdf' : ''; // Change based on file type
  const fileSizeKB = fileValid ? (Buffer.byteLength(file_b64, 'base64') / 1024).toFixed(2) : '';

  // Response
  res.json({
    is_success: true,
    user_id: 'yash_dixit',
    email: 'yd7067@srmist.edu.in',
    roll_number: 'RA2111027010120',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

// GET Endpoint - /bfhl
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});