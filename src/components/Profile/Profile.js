
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {


  let data = localStorage.getItem('data')
  data = JSON.parse(data)
  

  const nav = useNavigate()


  return (

    <>
      <div className='profile1'>
        <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt='pro' />
        <h3>Name: {data.name}</h3>
        <article> Email: {data.email}</article>
        <p>Phone: {data.mobileNo}</p>
        <p>Gander: {data.gander}</p>
        <button className='but' onClick={() => nav('/myProduct')}>My products</button>

        {/* <button className='but2' >My Cart</button> */}

      </div>

    </>
  )
}

export default Profile
