import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(process.env.Database_URL || 'Database_URL not set');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
