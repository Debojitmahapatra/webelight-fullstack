import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Sign.css'
function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [mobileNo, setmobileNo] = useState('')
    const [gander, setgander] = useState("")

    const [district, setdistrict] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')

    const navigate = useNavigate()

    async function getAllData() {
        console.log({ name, email, password, confirmpassword, mobileNo, gander, city, district, pincode });
        let data = { name, email, password, confirmpassword, mobileNo, gander, city, district, pincode }
        let result = await fetch("http://localhost:5000/createuser", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result);
        if (result.status === true) {
            navigate('/login')
        } else {
            alert(result.message)
        }
    }
    return (
        <div className='register'>
            <h1>SIGN UP</h1>

            <input className="input-box" type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            <input className="input-box" type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            <input className="input-box" type='text' value={password} onChange={(e) => setPass(e.target.value)} placeholder=" Password" />
            <input className="input-box" type='text' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} placeholder=" Confirm Password" />
            <input className="input-box" type='text' value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} placeholder="Enter mobileNo" />

            <select value={gander} className="input-box" onChange={(e) => setgander(e.target.value)}>
                <option>Select gander</option>
                <option>Male</option>
                <option>FeMale</option>

            </select>

            <input className="input-box" type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder=" City" />
            <input className="input-box" type='text' value={district} onChange={(e) => setdistrict(e.target.value)} placeholder=" district" />
            <input className="input-box" type='text' value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder=" Pincode" />
            <button onClick={getAllData} className='register-button' type='button'>sign up</button>
        </div>
    )
}
export default SignUp