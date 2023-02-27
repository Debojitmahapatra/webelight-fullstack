const express = require('express');
const router = express.Router();
const {createUser,loginUser}=require("../controllers/userController")
const {createProduct,getProduct,getProductById,updateProduct,deleteProduct,searchByKey,searchProductByUserId}=require("../controllers/productController")
const {createCart,getCart,updateCart}=require("../controllers/cartController")
const {createOrder,getorder}=require("../controllers/orderController")
const {authentication}=require("../auth/auth")
//user
router.post("/createuser",createUser)
router.post("/login",loginUser)

//product
router.post("/product",authentication,createProduct)
router.get("/Product",authentication,getProduct)
router.get("/Product/:ProductId",authentication,getProductById)
router.put("/Product/:ProductId",authentication,updateProduct)
router.delete("/Product/:ProductId",authentication,deleteProduct)
router.get('/searchproducts/:key',authentication,searchByKey)
router.get("/myProduct",authentication,searchProductByUserId)
//card
router.post("/users/:userId/cart",createCart)
router.get("/users/:userId/cart",getCart)
router.put("/users/:userId/cart",updateCart)

//order
router.post("/users/:userId/order",createOrder)
router.get("/users/:userId/order",getorder)

module.exports=router