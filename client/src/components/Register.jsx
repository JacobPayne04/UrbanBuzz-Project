import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const Register = () => {

  const [username, setUsername] = useState("")
  const [image, setImage] = useState("")
  const [email, setEmail] = useState()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const navigate = useNavigate()
  const [errors, setErrors] = useState({

  })

  const register = (e) => {
    e.preventDefault();

    const tempObjectToSendToDB = {
      username,
      image,
      email,
      password,
      confirm
    };


    // SUBMITING THE PRODUCTS
    axios.post("http://localhost:8000/api/register", tempObjectToSendToDB, { withCredentials: true })
      .then(res => {
        console.log("✅✅✅✅", res.data)
        if (res.data.errors) {
          setErrors(res.data.errors)
          navigate("/register")
        } else {
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
        }
      })
      .catch(err => console.log("❌❌❌", err))
  }



  return (
    <div className='All' >
      <div className='login  '>

        <div className='glass-form '>
          <form onSubmit={register} >
            <h3>Register Account</h3>
            <div className='mb-2' >
              <label htmlFor="username">Username</label>
              <input type="username" placeholder='Enter Username' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='mb-2' >
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-2' >
              <label htmlFor="image">Email</label>
              <input type="text" placeholder='Enter Profile picture' className='form-control' value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Enter Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor="c_password"> Confrim Password</label>
              <input type="password" placeholder='Confirm Password' className='form-control' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <div className='d-grid'>
              <button className='btn btn-primary' type='submit'>Register</button>
            </div>
          </form>
        
        </div>

      </div>
    </div>
    
  )
}

export default Register