const { Schema, model } = require('mongoose');

const injurySchema = new Schema({
    roll: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    injuryType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lowestCure: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    } 
});

module.exports = model('Injury', injurySchema);