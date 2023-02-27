import React from "react";
import './UpdateProduct.css'
import { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Update_product = () => {
    
    const [ProductName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')

    const params = useParams()
    const nav = useNavigate()

    useEffect(() => {
        getProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const getProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        setProductName(result.data.ProductName)
        setPrice(result.data.price)
        setCategory(result.data.category)
        setImage(result.data.image)
       
    }

    const updateProduct = async () => {
        // console.warn(name, price);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ ProductName, category,price, image }),
            headers: {
                'Content-Type': "application/json",
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if (result.status === true) {
            // console.warn(result.message)
            // console.warn(result)
            alert("Successful")
            setProductName('')
            setPrice('')
            setCategory('')
            setImage('')
            nav('/myProduct')
        }
        else {
            alert(result.message)
        }

    }

    return (
        <div className="register" >
            <h1>Update product</h1>


            <input type='text' placeholder="Enter product ProductName" className="input-box"
                value={ProductName} onChange={(e) => { setProductName(e.target.value) }}
            />


            <input type='text' placeholder="Enter product image" className="input-box"
                value={image} onChange={(e) => { setImage(e.target.value) }}
            />


            <input type='text' placeholder="Enter price" className="input-box"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type='text' placeholder="Enter category" className="input-box"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <button onClick={updateProduct} className="register-button">Update product</button>
        </div>
    )
}

export default Update_product