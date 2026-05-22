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

async function createTrade(req, res) {
  try {
    const { symbol, side, quantity, orderType, price, takeProfit, stopLoss } = req.body;
    
    // Validar campos obrigatórios
    if (!symbol) {
      return res.status(400).json({ status: 'error', message: 'Campo obrigatório ausente: symbol' });
    }
    if (!side) {
      return res.status(400).json({ status: 'error', message: 'Campo obrigatório ausente: side' });
    }
    if (!quantity) {
      return res.status(400).json({ status: 'error', message: 'Campo obrigatório ausente: quantity' });
    }
    if (!orderType) {
      return res.status(400).json({ status: 'error', message: 'Campo obrigatório ausente: orderType' });
    }

    // Se a ordem for Limit, preço é obrigatório
    if (orderType === 'Limit' && !price) {
      return res.status(400).json({ status: 'error', message: 'Preço obrigatório para ordens Limit' });
    }

    // Validar side
    if (!['Buy', 'Sell'].includes(side)) {
      return res.status(400).json({ status: 'error', message: 'side deve ser "Buy" ou "Sell"' });
    }

    // Validar orderType
    if (!['Market', 'Limit'].includes(orderType)) {
      return res.status(400).json({ status: 'error', message: 'orderType deve ser "Market" ou "Limit"' });
    }

    // Integrar com Bybit API
    const resultado = await bybitService.createOrder({
      symbol,
      side,
      quantity,
      orderType,
      price,
      takeProfit,
      stopLoss
    });

    res.json({
      status: 'success',
      orderId: resultado.orderId || 'pendente',
      symbol,
      side,
      quantity,
      orderType,
      price: price || null,
      takeProfit: takeProfit || null,
      stopLoss: stopLoss || null,
      createdAt: new Date().toISOString(),
      message: 'Ordem criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar ordem:', error.message);
    res.status(500).json({ status: 'error', message: 'Erro ao processar a ordem', error: error.message });
  }
}

module.exports = {
  getTime,
  createTrade,
};
