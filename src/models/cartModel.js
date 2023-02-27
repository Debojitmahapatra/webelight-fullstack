const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true, trim: true, unique: true
    },
    totalPrice: {
        type: Number,
        trim: true,
        required: true
    },
    totalItems: {
        type: Number,
        trim: true,
        required: true
    },
    items: [{
        productId: {
            type: ObjectId,
            trim: true,
            required: true,
            ref: 'Product'
        },
        name:{
            type:String,
            required: true
        },
        image:{
             type:String,
             required: true
        },
        price: {
            type: String,
            required: true,
            trim: true,
          },
        quantity: {
            type: Number,
            trim: true,
            required: true
        }
    }
    ],

}, { timestamps: true })



module.exports = mongoose.model('Cart', cartSchema);