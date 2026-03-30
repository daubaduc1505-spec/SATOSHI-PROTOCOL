// backend/server.js
const express = require('express');
const cors = require('cors');
const config = require('../config');

const app = express();
app.use(cors());
app.use(express.json());

console.log(`🪙 Token: ${config.token.symbol} - ${config.token.mint}`);
console.log(`🔗 Pump.fun: ${config.links.pumpfun}`);

// Mock API endpoints
app.get('/api/stats/global', (req, res) => {
    res.json({
        totalDistributed: 1250.75,
        totalCycles: 42,
        accumulatingBTC: 2.35,
        currentPool: 2.35,
        totalHolders: 1523,
        nextDistributionMinutes: 45
    });
});

app.get('/api/holders/top', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const mockHolders = [
        { wallet: 'GjX5...mR8', balance: 1000000, percentage: 10, rewardsEarned: 125.5 },
        { wallet: 'FmR8...pL3', balance: 500000, percentage: 5, rewardsEarned: 62.75 },
        { wallet: 'HpL3...xYz', balance: 250000, percentage: 2.5, rewardsEarned: 31.38 },
    ];
    res.json(mockHolders.slice(0, limit));
});

app.get('/api/cycles/current', (req, res) => {
    const remainingTime = 45 * 60 * 1000;
    res.json({
        cycleNumber: 43,
        remainingTime: remainingTime,
        nextDistribution: new Date(Date.now() + remainingTime)
    });
});

app.get('/api/distributions/recent', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const logs = Array(limit).fill().map((_, i) => ({
        time: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
        amount: (Math.random() * 0.5 + 0.1).toFixed(4),
        recipients: Math.floor(Math.random() * 50) + 10,
        txId: `distribution_${Date.now() - i * 60 * 60 * 1000}`
    }));
    res.json(logs);
});

app.get('/api/rewards/eligibility/:wallet', (req, res) => {
    res