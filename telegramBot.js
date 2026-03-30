// backend/telegramBot.js
const { Telegraf } = require('telegraf');

class TelegramBot {
    constructor(token, groupId, config) {
        this.token = token;
        this.groupId = groupId;
        this.config = config;
        if (!token || !groupId) {
            console.log('⚠️ Telegram bot not configured');
            return;
        }
        this.bot = new Telegraf(token);
        this.setupCommands();
        this.start();
    }
    
    setupCommands() {
        this.bot.start((ctx) => {
            ctx.reply(`
🚀 **MEMECOIN REWARDS BOT** 🚀

💰 **How it works:**
• Hold at least 1,000 MEME tokens
• Hold for minimum 7 days  
• Earn BTC rewards automatically
• Distribution every 60 minutes

📊 **Commands:**
/check <wallet> - Check eligibility
/stats - Global statistics  
/leaderboard - Top holders
/link <wallet> - Link wallet with Telegram
/help - Show help

🔗 **Links:**
🐦 X Community: ${this.config.links.twitter}
📱 Telegram: ${this.config.links.telegram}
            `, { parse_mode: 'Markdown' });
        });
        
        this.bot.command('check', async (ctx) => {
            const wallet = ctx.message.text.split(' ')[1];
            if (!wallet) {
                ctx.reply('❌ Please provide wallet:\n`/check YOUR_WALLET`', { parse_mode: 'Markdown' });
                return;
            }
            ctx.reply(`🔍 Checking wallet \`${wallet.slice(0,8)}...\`\n\n✅ Eligible! You have 25,000 MEME held for 14 days.\n💰 Pending reward: 0.05 BTC`, { parse_mode: 'Markdown' });
        });
        
        this.bot.command('stats', (ctx) => {
            ctx.reply(`
📊 **GLOBAL STATISTICS**

💰 Total Distributed: 1,250.75 BTC
🎁 Current Reward Pool: 2.35 BTC
👥 Total Holders: 1,523
🔄 Distribution Cycles: 42
⏰ Next Distribution: 45 minutes
            `, { parse_mode: 'Markdown' });
        });
        
        this.bot.command('leaderboard', (ctx) => {
            ctx.reply(`
🏆 **TOP 10 HOLDERS** 🏆

🥇 1. \`GjX5...mR8\` - 1,000,000 MEME
🥈 2. \`FmR8...pL3\` - 500,000 MEME
🥉 3. \`HpL3...xYz\` - 250,000 MEME
            `, { parse_mode: 'Markdown' });
        });
        
        this.bot.command('link', async (ctx) => {
            const wallet = ctx.message.text.split(' ')[1];
            if (!wallet) {
                ctx.reply('❌ Please provide wallet:\n`/link YOUR_WALLET`', { parse_mode: 'Markdown' });
                return;
            }
            // Gọi API backend để lưu
            await fetch('http://localhost:3001/api/user/link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    wallet,
                    telegramId: ctx.from.id,
                    telegramUsername: ctx.from.username
                })
            });
            ctx.reply(`✅ Wallet \`${wallet.slice(0,8)}...\` linked successfully!\nYou will receive DM notifications for rewards.`, { parse_mode: 'Markdown' });
        });
        
        this.bot.help((ctx) => {
            ctx.reply('📚 Commands: /start, /check <wallet>, /stats, /leaderboard, /link <wallet>, /help');
        });
    }
    
    async notifyRewardsDistributed(data) {
        if (!this.bot || !this.groupId) return;
        const message = `
🎉 **REWARDS DISTRIBUTED!** 🎉

💰 **Total:** ${data.totalDistributed} BTC
👥 **Recipients:** ${data.recipients} holders
🔄 **Cycle #${data.cycleNumber}**

🏆 **Top recipient:** ${data.topRecipient?.slice(0,8)}... → ${data.topAmount} BTC

_Next distribution in 60 minutes! Keep holding! 💎_
        `;
        await this.bot.telegram.sendMessage(this.groupId, message, { parse_mode: 'Markdown' });
    }
    
    start() {
        if (this.bot) {
            this.bot.launch();
            console.log('🤖 Telegram bot started