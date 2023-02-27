let cartModel = require("../models/cartModel")
let userModel = require("../models/userModel")
let productModel = require("../models/productModel")
const validData = require("../validators/validators")

module.exports.createCart = async function (req, res) {
    try {
        const userId = req.params.userId
        const body = req.body
        let { productId, quantity } = body

        if (!validData.isValid(userId)) {
            return res.status(400).send({ status: false, message: "Please enter userId" })
        }

        if (!quantity) { quantity = 1 }
        if (!validData.isValid(productId)) {
            return res.status(400).send({ status: false, message: "Please enter Product" })
        }
        if (!validData.isValidObjectId(productId)) { return res.status(400).send({ status: false, message: "Please enter a valid product id" }) }

        //if user exists
        const findThatUser = await userModel.findOne({ _id: userId })
        if (!findThatUser) { return res.status(404).send({ status: false, message: "user not found" }) }
        // if product exists
        const findThatProduct = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!findThatProduct) { return res.status(404).send({ status: false, message: "product not found or deleted" }); }
        //if cart already exists
        const findThatCart = await cartModel.findOne({ userId: userId })
        if (!findThatCart) {
            let item = [];

            let productin = { productId: findThatProduct._id, image: findThatProduct.image, name: findThatProduct.ProductName, price: findThatProduct.price, quantity: quantity }

            item.push(productin)
            const cart = {
                userId: userId,
                items: item,

                totalPrice: findThatProduct.price * quantity,
                totalItems: 1
            }

            let cartCreated = await cartModel.create(cart)
            let finalresult = await cartModel.findOne({ _id: cartCreated._id }).select({ "items._id": 0 })
            return res.status(201).send({ status: true, message: "Success", data: finalresult })
        }
        if (findThatCart) {
            let price = findThatCart.totalPrice + (quantity * findThatProduct.price)
            let existedItems = findThatCart.items
            for (let i in existedItems) {

                if (existedItems[i].productId.toString() === productId) {  //toString()
                    existedItems[i].quantity += quantity
                    let updatedCart = { items: existedItems, totalPrice: price, totalItems: existedItems.length }

 
                    let newCart = await cartModel.findOneAndUpdate({ _id: findThatCart._id, userId: userId }, updatedCart, { new: true }).select({ "items._id": 0 })
                    return res.status(201).send({ status: true, message: "Success", data: newCart });
                }
            }
            existedItems.push({ productId: productId, image: findThatProduct.image, name: findThatProduct.ProductName, price: findThatProduct.price, quantity: quantity });
            let updateCart = { items: existedItems, totalPrice: price, totalItems: existedItems.length }
            let finalData = await cartModel.findOneAndUpdate({ _id: findThatCart._id }, updateCart, { new: true }).select({ "items._id": 0 })
            return res.status(201).send({ status: true, message: "Success", data: finalData });

        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.getCart = async function (req, res) {
    try {
        let Id = req.params.userId
        if (!validData.isValid(Id)) {
            return res.status(400).send({ status: false, message: "Please enter userId" })
        }
        const cardFind = await userModel.findOne({ _id: Id })
        if (!cardFind) { return res.status(404).send({ status: false, message: 'User not found' }) };


        const validCart = await cartModel.findOne({ userId: Id }).select({ "items._id": 0 })

        if (!validCart) {
            return res.status(200).send({ status: true, message: "Success", data: { userId: Id, totalPrice: 0, totalItems: 0, items: [] } })

        }
        return res.status(200).send({ status: true, message: "Success", data: validCart })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.updateCart = async function (req, res) {
    try {

        let userId = req.params.userId
        let Data = req.body
        let { productId,removeProduct } = Data

        const findUser = await userModel.findOne({ _id: userId })
        if (!findUser) { return res.status(404).send({ status: false, message: 'User not found' }) };

        const product = await productModel.findOne({ _id: productId, isDeleted: false });
        if (!product) {
            return res.status(400).send({ status: false, message: "Product doesn't exists or deleted" })
        }
        const findThatCart = await cartModel.findOne({ userId: userId });
        if (!findThatCart) { return res.status(400).send({ status: false, message: "this cart  doesn't exists from this user" }) }

        if (!((removeProduct == 1) || (removeProduct == 0))) return res.status(400).send({ status: false, message: "removeProduct can be 0 or 1" })

        let productInCart = await cartModel.findOne({ items: { $elemMatch: { productId: productId } } })
        if (!productInCart) {
            return res.status(400).send({ status: false, message: "This product does not exists in the cart" })
        }

      let  findQuantity = findThatCart.items.find(x => x.productId.toString() === productId);
        if (removeProduct === 0) {
            let totalAmount = findThatCart.totalPrice - (product.price * findQuantity.quantity) // substract the amount of product*quantity

            await cartModel.findOneAndUpdate({ userId: userId }, { $pull: { items: { productId: productId } } }, { new: true })

            let quantity = findThatCart.totalItems - 1
            let data = await cartModel.findOneAndUpdate({ userId: userId }, { $set: { totalPrice: totalAmount, totalItems: quantity } }, { new: true }).select({ "items._id": 0 }) //update the cart with total items and totalprice

            return res.status(200).send({ status: true, message: `Success`, data: data })
        }

        // decrement quantity
        let totalAmount = findThatCart.totalPrice - product.price
        let itemsArr = findThatCart.items

        for (i in itemsArr) {
            if (itemsArr[i].productId.toString() === productId) {  //tostring 
                itemsArr[i].quantity = itemsArr[i].quantity - 1

                if (itemsArr[i].quantity < 1) {
                    await cartModel.findOneAndUpdate({ userId: userId }, { $pull: { items: { productId: productId } } }, { new: true })
                    let quantity = findThatCart.totalItems - 1

                    let data = await cartModel.findOneAndUpdate({ userId: userId }, { $set: { totalPrice: totalAmount, totalItems: quantity } },
                        { new: true }).select({ "items._id": 0 }) //update the cart with total items and totalprice

                    return res.status(200).send({ status: true, message: `Success`, data: data })
                }
            }
        }
        let data = await cartModel.findOneAndUpdate({ userId: userId }, { items: itemsArr, totalPrice: totalAmount }, { new: true }).select({ "items._id": 0 })
        return res.status(200).send({ status: true, message: `Success`, data: data })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


// const updateca=async function (req,res){
//     try {
//         let userId=req.params.userId
//         let body=req.body
//         let {productId,count}=body

//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message })
//     }
// }