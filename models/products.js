const mongoose = require('mongoose');

const productsSchema = mongoose.Schema(
{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Products", productsSchema);