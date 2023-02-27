const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true, 
        trim: true
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
        ProductId:{
            type: ObjectId,
            trim: true,
            required: true,
            ref: 'Product'
        },
        Productname:{
            type:String,
            required: true
        },
        productQuantity: {
            type: Number,
            trim: true,
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
          }
    }
    ],

}, { timestamps: true })



module.exports = mongoose.model('Order', orderSchema);