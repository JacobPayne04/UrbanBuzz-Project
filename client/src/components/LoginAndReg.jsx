import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styling/Main.css';
import Login from './Login';
import Register from './Register';
import '../styling/LoginAndReg.css';

const LoginAndReg = (props) => {


    return (



        <div className='combine' >
             <Register/> 
            <Login/>
           
        </div>


    )
}

export default LoginAndReg