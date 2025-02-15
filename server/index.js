import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

let submissions = [];

app.use(cors());
app.use(express.json());

app.use(express.static(join(__dirname, '../dist')));

app.post('/api/submit', (req, res) => {
  const formData = {
    id: Date.now().toString(),
    ...req.body
  };
  submissions.push(formData);
  res.json({ data: formData });
});

app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});