const express = require('express');
const PORT = 3005;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});