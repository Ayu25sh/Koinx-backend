const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    coin: { 
        type: String, 
        required: [true, 'Coin name is required'],
        minlength: [3, 'Coin name must be at least 3 characters long'], 
        trim: true,
    },
    price: {
        type: Number, 
        required: [true, 'Price is required'],
        validate: {
            validator: Number.isFinite,
            message: 'Price must be a valid number'
        }
    },
    marketCap: { 
        type: Number, 
        required: [true, 'Market Cap is required'],
        validate: {
            validator: Number.isFinite,
            message: 'Market Cap must be a valid number'
        }
    },
    change24h: { 
        type: Number, 
        required: [true, '24-hour price change is required'],
        validate: {
            validator: Number.isFinite,
            message: '24-hour change must be a valid number'
        }
    },
    timestamp: { 
        type: Date, 
        default: Date.now,
        validate: {
            validator: function(value) {
                return value <= Date.now();
            },
            message: 'Timestamp cannot be in the future'
        }
    }
});


module.exports = mongoose.model("Crypto",cryptoSchema);
