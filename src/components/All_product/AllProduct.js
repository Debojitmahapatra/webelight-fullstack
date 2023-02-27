import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./AllProduct.css";


function AllProduct() {
  const [products, setProducts] = useState([]);
  let nav = useNavigate()
  function logOutUser() {
    localStorage.clear()
    alert("session expired please log in again")
    nav('/login')
  }
  // let uId = localStorage.getItem('woner')
  // uId=JSON.parse(uId)
  // uId=uId._id

  useEffect(() => {
    getproducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:5000/product", {

      headers: {
        authorization: `${JSON.parse(localStorage.getItem('token'))}`
      }

    })
    result = await result.json();

    if (result.data) { setProducts(result.data); }
    else if (result.message === "No product found") {
      alert("No Product found please add new product")
      nav('/add')
    }
    else {
      logOutUser()
    }
  };
  console.log("products", products)

  const addCart = async (productId) => {

    const userId = JSON.parse(localStorage.getItem('data'))._id
    console.warn(userId)

    let result = await fetch(`http://localhost:5000/users/${userId}/cart`, {
      method: 'post',
      body: JSON.stringify({ productId}),
      headers: {
        'Content-Type': 'application/json',
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }

    })
    result = await result.json()
    console.warn(result)

    if (result.status === true) {
      nav(`/users/${userId}/cart`)
    }
    else {
      alert(result.message)
    }
  }
  const searchHandle = async (e) => {
    let key = e.target.value;
    console.log(key)
    if (key) {
      let result = await fetch(`http://localhost:5000/searchproducts/${key}`, {

        headers: {
          authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      console.log(result)
      if (result) {
        setProducts(result);
      }
    } else {
      getproducts();
    }
  };

  return (
    <>
      <div className="product-list">
        {/* <h2>Product list</h2> */}
        <input
          className="searchbox"
          type="text"
          placeholder="Search Product"
          onChange={searchHandle}
        />
      </div>

      <div className="midlle">
        {
          products.length > 0 ? products.map((item, index) => (
            <ul key={index}>
              <li >
                {

                  <Card className='classcard56'>
                    <Card.Img className='cardImg' variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title className='head'>{item.ProductName.slice(0, 20)}</Card.Title>
                      <Card.Text>{item.category.slice(0, 20)}...</Card.Text>
                      <Card.Title className='pric'>₹ {item.price}</Card.Title>
                      <div className='butn'>

                        <Button className='cart-btn-add' onClick={() => addCart(item._id)} >Add To Cart</Button>
                        {/* <Button onClick={() => nav(`/view/${item._id}`)} className='cart-btn' >card</Button> */}
                      </div>
                    </Card.Body>
                  </Card>

                } </li>
            </ul>
          ))
            : <h1>No Product found</h1>
        }
      </div>
    </>
  );
}

export default AllProduct
