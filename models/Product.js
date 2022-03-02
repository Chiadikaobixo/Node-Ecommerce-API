const mongoose = require('mongoose')

const ProductSchema = ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    prize: {
        type: Number,
        required: true
    }
}, {
    timestamp: true
})

module.exports = mongoose.model('Product', ProductSchema)