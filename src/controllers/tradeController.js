const bybitService = require('../services/bybitService');

async function getTime(req, res) {
  try {
    const data = await bybitService.getServerTime();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar hora da Bybit:', error.message);
    res.status(500).json({ error: 'Erro ao buscar hora da Bybit' });
  }
}

module.exports = {
  getTime,
};
