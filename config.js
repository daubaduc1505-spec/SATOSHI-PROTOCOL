// config.js - ĐƯA LÊN GITHUB (an toàn)
module.exports = {
  links: {
    twitter: 'https://x.com/i/communities/2038186875488522599',
    telegram: 'https://t.me/BTCReward2026',
    pumpfun: 'https://pump.fun/coin/AyKA6c7NV2Edco5xB3dbez8q7G3wvq4mFASRz5pgpump',
  },
  
  token: {
    name: 'SATOSHI PROTOCOL',
    symbol: '$SATOSHI',
    mint: 'AyKA6c7NV2Edco5xB3dbez8q7G3wvq4mFASRz5pgpump',
  },
  
  addresses: {
    feeWallet: '7g8d6eTrEHNkmK586RA1JzhSajFYe5Tt1fV7wRMrtfzR',
    rewardWallet: '2Q7AYFHVpJyKNd8weZqmYcxvgje19tr5JBTPKZ2PQDWd',
  },
  
  // 🤖 TELEGRAM - LẤY TỪ ENV, KHÔNG CHỨA GIÁ TRỊ THẬT
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '',
    groupId: process.env.TELEGRAM_GROUP_ID || '',
  },
  
  music: {
    enabled: true,
    playlist: [ /* ... */ ]
  }
};