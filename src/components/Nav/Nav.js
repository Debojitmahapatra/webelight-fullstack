import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'

function Nav() {
    let data = localStorage.getItem('data')
    data = JSON.parse(data)
    
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/signup')
    }

    return (
        <div>
            <img
                className='logoStyle'
                src="https://cdn2.vectorstock.com/i/1000x1000/17/01/shopping-cart-check-mark-logo-vector-17201701.jpg" alt="logo" />

            <p className='titleStyle'>Shoping cart</p>
            {
                data ? <ul className='nav-ul'>
                    <li><Link to='/'>Product List</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>

                    <li> <Link onClick={logout} to='/signup'>Logout [{data.name}]</Link> </li>
                 <Link to={`/users/${data._id}/cart`}>
                  <img className='cartStyle'
                src="https://thumbs.dreamstime.com/b/shopping-cart-icon-vector-sale-shopping-cart-icon-vector-170609053.jpg" alt="cart"
                />
         </Link>
                </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link to='/signup'>Signup</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
            }

                  </div>
    )
}
export default Nav