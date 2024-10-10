const { getLatestCryptoData, getStandardDeviation } = require('../services/service.js');


//Controller for fetching the latest stats of a cryptocurrency
exports.getStats = async(req, res) => {
    try {
        const { coin } = req.query;
        // console.log("coin",coin)

        if(!coin){
            return res.status(400).json({ 
                success:false,
                message:"Coin is required"
            });
        } 

        const latestData = await getLatestCryptoData(coin);
        // console.log("response",latestData)

        if(!latestData){
            return res.status(404).json({
                success:false,
                message:"Data not found for the requested coin"
            });
        }

        return res.status(200).json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });

    }catch(error){
        return res.status(500).json({ 
            success:false,
            error: error.message 
        });
    }
};


// Controller for calculating the deviation of cryptocurrency prices
exports.getDeviation = async(req, res) => {
    try {
        const { coin } = req.query;
        // console.log('coin',coin)

        if(!coin){
            return res.status(400).json({ 
                success:false,
                message:"Coin is required"
            });
        } 

        const deviation = await getStandardDeviation(coin);
        // console.log("deviation ",deviation);

        return res.status(200).json({
            deviation
        });
    
    }catch(error){
        return res.status(500).json({ 
            success:false,
            error: error.message 
        });
    }
};
