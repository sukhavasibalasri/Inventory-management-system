const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: true,
        },
        ProductPrice: {
            type: Number,
            required: true,
        },
        ProductBuyPrice: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        ProductBarcode: {
            type: Number,
            required: true,
        },
            ProductStock: {
                type: Number,
                required: true,
                default: 0,
                min: 0,
            },
            ProductSold: {
                type: Number,
                required: true,
                default: 0,
                min: 0,
            },
    });

const Products = mongoose.model("Products", ProductSchema)
module.exports = Products;
