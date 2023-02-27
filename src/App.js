import 'bootstrap/dist/css/bootstrap.min.css';

 import './App.css';
import Nav from './components/Nav/Nav';  //done
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SignUp from './components/SignUp/SignUp';  //done
import PrivateComponent from './components/Private/PrivateComponent'; //done
import Login from './components/Login/Login'  //done
import AddProduct from './components/AddProduct/AddProduct';
import AllProduct from './components/All_product/AllProduct'
import Profile from './components/Profile/Profile';
import ProductList from './components/ProductList/ProductList';
import Updateproduct from './components/Update_product/UpdateProduct';
import GetCart from './components/getCart/GetCart';
import Order from './components/Order/Order';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path='/myProduct' element={<ProductList/>}/>
            <Route path='/' element={<AllProduct/>} />
            <Route path='/add' element={<AddProduct/>} />
            <Route path='/update/:id' element={<Updateproduct/>} />
            <Route path='/logout' element={<h1>logout</h1>} />
            <Route path='/users/:userId/cart' element={<GetCart/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/order' element={<Order/>} />

          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;