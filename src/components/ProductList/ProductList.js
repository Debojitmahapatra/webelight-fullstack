import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  let nav = useNavigate()

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:5000/myProduct",{

    headers:{
      authorization: `${JSON.parse(localStorage.getItem('token'))}`
    }

  })
    result = await result.json();
    setProducts(result);
  };
      console.warn("products", products)

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers:{
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    // console.warn(result)

    if (result.status===true) {
      alert(result.message);
      getproducts();
    }else{
      alert(result.message)
    }
  };


  return (
    <>

      <div className="midlle">
      {
       
      products.length>0 ? products.map((item, index) => (
        <ul key={index}>
          <li className="all-pro">
            {
          <div className='classcard' >
          <img className='cardImg' src={item.image} alt={item.ProductName}/>
          <h3>{item.ProductName}</h3>
        
          <span >{item.category.slice(0,30)}...</span>
          <h4>₹ {item.price}</h4>
        

          
            <button className="cart-btn1" onClick={() => deleteProduct(item._id)}>Delete</button>
             
             <button className="cart-btn1" onClick={() => nav(`/update/${item._id}`)}>Update</button>
             </div>
       
 } </li>
        </ul>
      ))
      : <h1>No result found</h1>
      }
    </div>
    </>
  );
};

export default ProductList;
