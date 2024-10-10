const Crypto = require('../model/Crypto');


// Service to fetch latest data for a coin
exports.getLatestCryptoData = async(coin) => {

    // console.log('coin',coin);
    const result = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    // console.log(result);

    return result;

};


// Service to get last 100 records and calculate standard deviation
exports.getStandardDeviation = async(coin) => {

    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    const prices = records.map(record => record.price);

    if(prices.length < 2) {
        throw new Error('Not enough data to calculate deviation');
    }

    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  
    return Math.sqrt(variance);
};

