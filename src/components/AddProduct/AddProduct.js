import React from "react";
import './AddProduct.css'
import { useState } from 'react'

const Addproduct = () => {

    const [ProductName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')



    const addProduct = async () => {
        console.log({ ProductName, price, image, category });
        const userId = JSON.parse(localStorage.getItem('data'))._id
        console.warn(userId)

        let result = await fetch('http://localhost:5000/product', {
            method: 'post',
            body: JSON.stringify({ ProductName, price, image, userId, category }),
            headers: {
                'Content-Type': 'application/json',
                authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
            }

        })
        result = await result.json()
        console.warn(result)

        if (result.status === true) {
            alert("Successful")
            setProductName('')
            setPrice('')
            setImage('')
            setCategory('')
        }
        else {
            alert(result.message)
        }
    }

    return (
        <div className="register" >
            <h1>Add product</h1>

            <input type='text' placeholder="Enter ProductName" className="input-box"
                value={ProductName} onChange={(e) => { setProductName(e.target.value) }}
            />


            <input type='text' placeholder="Enter price" className="input-box"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type='text' placeholder="Enter product image" className="input-box"
                value={image} onChange={(e) => { setImage(e.target.value) }}
            />

            <input type='text' placeholder="Enter category" className="input-box"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />


            <button onClick={addProduct} className="register-button">Add product</button>
        </div>
    )
}


export default Addproduct
