require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tradeRoutes = require('./src/routes/tradeRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/trades', tradeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend Bybit rodando 🚀' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
