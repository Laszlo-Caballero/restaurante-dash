const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'dist', 'restaurante-dash', 'browser')));

app.get('/*w', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'restaurante-dash', 'browser', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
