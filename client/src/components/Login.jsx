import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styling/Login.css';

const Login = () => {

  const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errormsg, seterrormsg] = useState("")
    const navigate = useNavigate()

    const username = localStorage.getItem("username")

    const login = (e) => {
        e.preventDefault();
    
        const tempObjectToSendToDB = {
            email,
            password
        };
    
        console.log(tempObjectToSendToDB)
        // SUBMITING THE PRODUCTS
        axios.post("http://localhost:8000/api/login", tempObjectToSendToDB, {withCredentials:true})
            .then(res => {
                console.log("✅✅✅✅", res.data)
                if(res.data.message== "Login successful"){
                    localStorage.setItem("username", res.data.user.username)
                    const username = localStorage.getItem("username")
                    localStorage.setItem("image", res.data.user.image)
                    const image = localStorage.getItem("image")
                    localStorage.setItem("email", res.data.user.email)
                    const email = localStorage.getItem("email")
                    localStorage.setItem("_id", res.data.user._id)
                    const _id = localStorage.getItem("_id")
                    console.log(username)
                    console.log(image)
                    console.log(email)
                    console.log(_id)
                    navigate("/main")
                }else{
                    seterrormsg(res.data.message)
                }
            })
            .catch(err => console.log("❌❌❌", err))
    }




  return (
    
    <div className='All'>
      <div className=''>

        <div  className='glass-form'>
          <form onSubmit={login}>
            <h3>sign in</h3>
            <div className='mb-2' >
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='d-grid'>
              <button className='btn btn-primary' type='submit'>Login</button>
            </div>


          </form>
        </div>

      </div>
    </div>
  )
}

export default Login