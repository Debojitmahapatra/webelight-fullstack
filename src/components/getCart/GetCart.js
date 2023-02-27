import React, { useState, useEffect } from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import "./GetCart.css"
import { useNavigate } from "react-router-dom";

function GetCart() {
  const [products, setProducts] = useState([]);
  const [price, setprice] = useState(0)
  const [quntity, setquntity] = useState(0)
  let nav = useNavigate()

  useEffect(() => {
    getproducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const userId = JSON.parse(localStorage.getItem('data'))._id
  const getproducts = async () => {
    let result = await fetch(`http://localhost:5000/users/${userId}/cart`, {

      headers: {
        authorization: `${JSON.parse(localStorage.getItem('token'))}`
      }
   
    })
    result = await result.json();
    console.log(result)
    setprice(result.data.totalPrice)
    setquntity(result.data.totalItems)
    setProducts(result.data.items);
  };


  const addCart = async (productId) => {

    let result = await fetch(`http://localhost:5000/users/${userId}/cart`, {
      method: 'post',
      body: JSON.stringify({ productId}),
      headers: {
        'Content-Type': 'application/json',
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }

    })
    result = await result.json()
    if (result.status === true) {
      getproducts()
    }
    console.warn(result)
  }
  const deleteCart = async (productId) => {
    let removeProduct=1
    console.log({ productId,removeProduct})
    let result = await fetch(`http://localhost:5000/users/${userId}/cart`, {
      method: 'put',
      body: JSON.stringify({ productId,removeProduct}),
      headers: {
        'Content-Type': 'application/json',
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json()
    if (result.status === true) {
      getproducts()
    }
    
  }
  const order = async () => {
    console.log("object")
    
    let result = await fetch(`http://localhost:5000/users/${userId}/order`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json()
    console.log(result)
    if (result.status === true) {
      nav(`/order`)
    }else{
      alert(result.message)
    }
    
  }
  const deletefullcart = async (productId) => {
    let removeProduct=0
    console.log({ productId,removeProduct})
    let result = await fetch(`http://localhost:5000/users/${userId}/cart`, {
      method: 'put',
      body: JSON.stringify({ productId,removeProduct}),
      headers: {
        'Content-Type': 'application/json',
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json()
    if (result.status === true) {
      getproducts()
    }
    
  }
  console.warn("products", products)
  return (
    <>

      <div className="allcurt">

        <div className="total-compo">
          <h2>Total Price:<br /><h1>{price}</h1></h2>
          <h2>Total Items:<br /><h1>{quntity}</h1></h2>
          {/* <button>order Now</button> */}
          <Button variant="primary" size="lg" className="regbtn" onClick={()=>order()}> Order Now </Button>{' '}
        </div>
        {

          products.length > 0 ? products.map((item, index) => (
            <ul key={index}>
              <li className="card-product">
                {
                  <div className='cartall' >
                    <img className='cartImg' src={item.image} alt={item.image} />


                    <h3>{item.name.slice(0, 30)}...</h3>
                    <h4>price:  ₹ {item.price}</h4>
                    <h2>quantity: {item.quantity}</h2>

                    <ButtonGroup aria-label="Basic example" className="papu-button">
                      <Button variant="secondary" className="papu-button2" onClick={()=>addCart(item.productId)}>+</Button>
                      <Button variant="secondary" className="papu-button3">{item.quantity}</Button>
                      <Button variant="secondary" className="papu-button2" onClick={()=>deleteCart(item.productId)}>-</Button>
                    </ButtonGroup>
                    <button className="delete-cart-btn" onClick={() => deletefullcart(item.productId)}>REMOVE</button>
               
               {/* <button className="cart-btn1" onClick={() => nav(`/update/${item._id}`)}>Update</button> */}
                  </div>

                } </li>
            </ul>
          ))
            : <h1>No card found</h1>
        }
      </div>
    </>
  );

}
export default GetCart
