const { Decimal128 } = require('mongoose')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    lat: {
        type: Decimal128,
    },
    lon: {
        type: Decimal128,
    },
    phone: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)