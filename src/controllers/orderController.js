let cartModel = require("../models/cartModel")
let userModel = require("../models/userModel")
let productModel = require("../models/productModel")
let orderModel=require("../models/orderModel")

module.exports.createOrder=async function(req,res){
    try {
        const userId = req.params.userId
        let findCart=await cartModel.findOne({ userId: userId })
        console.log(findCart.items.length)
        if(!findCart){
            return res.status(400).send({ status: false, message: "Please enter items in cart " })
        } 
        if(findCart.items.length<1){
            return res.status(400).send({ status: false, message: "Please enter items in cart " })
        }
        if(findCart.items.length>1){
            let itemsArr=findCart.items
            let allItems=[]
            for (let i=0; i<itemsArr.length; i++) {
                let update={ProductId:itemsArr[i]._id,Productname:itemsArr[i].name, productQuantity:itemsArr[i].quantity, image:itemsArr[i].image, price:itemsArr[i].price}
                allItems.push(update)
            }
            let orderDetals={
                  user:findCart.userId,
                  totalPrice:findCart.totalPrice,
                  totalItems:findCart.totalItems,                 
                  items:allItems
            }
            let createorder=await orderModel.create(orderDetals)
            let finalresult = await orderModel.findOne({ _id: createorder._id }).select({ "items._id": 0 })
            await cartModel.findOneAndUpdate({userId: userId}, {$set: {totalPrice: 0, totalItems: 0, items:[]}}, {new: true})
            return res.status(201).send({ status: true, message: "Success", data: finalresult });


        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.getorder=async function(req,res){
    try {
        const userId = req.params.userId
        let findorder=await orderModel.find({ userId: userId })
     
        if(!findorder){
            return res.status(404).send({ status: false, message: "No orders found " })
        } 
       
        if(findorder.length>0){
            for(let i=0;i<findorder.length;i++){

            }
            let obj={}
            return res.status(200).send({ status: true, message: "Success", data: findorder });
        }
        else{
            return res.status(404).send({ status: false, message: "No orders found " })
        }



 
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}