const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('../model/Crypto');


// Fetch prices from CoinGecko API and save to database
const fetchCryptoData = async() => {
    // console.log('Cron job started at:', new Date());

    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum'];

        const url = 'https://api.coingecko.com/api/v3/simple/price';

        const response = await axios.get(url, {
            params: {
                ids: coins.join(','),
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true'
            }
        });

        // console.log("response",response);

        const data = response.data;

        coins.forEach(async (coin) => {
            const cryptoData = new Crypto({
                coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change,
                timestamp: new Date()
            });

            await cryptoData.save();

        });

        console.log('Crypto data saved to the database.');

    }catch(error){
        console.error('Error fetching prices:', error);
    }
};


// Schedule job to run every 2 hours

cron.schedule('0 */2 * * *', fetchCryptoData);

// cron.schedule('0 */2 * * *', () => {
//     console.log('Cron job executed at', new Date()); 
//     fetchCryptoData();
// });


// cron.schedule('* * * * *', fetchCryptoData);     //-------------      Runs every minute for testing


