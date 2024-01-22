import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styling/Create.css';


const Create = (props) => {
    const [ property, setProperty] = useState("Single Family")
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    const _id = localStorage.getItem("_id")
    const user_id = _id
 

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const submitHouse = (e) => {
        e.preventDefault();

        const tempObjectToSendToDB = {
            property: property,
            imageUrl: imageUrl,
            description: description
        };

        // SUBMITING THE PRODUCTS
        axios.post("http://localhost:8000/api/posts", tempObjectToSendToDB)
            .then(res => {
                console.log("✅✅✅✅", res.data)
                navigate("/main")
            })
            .catch(err => {
                console.log("❌❌❌❌", err)
                const errorResponse = err.response.data.errors;
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
            }
            )

    }



    return (
        <div className='create-container'>
            <div className=' ' >

                <div  className='create-form 40-w p-5 rounded '>
                    <form onSubmit={submitHouse}>
                        {errors.map((err, index) => <p key={index}>{err}</p>)}
                        <div>
                            <p>Type of Property: </p>
                            <input value={user_id} type="hidden" />
                            <select className='form-control' name="HouseType" id="houseType" value={property} onChange={e => setProperty(e.target.value)}  >
                                <option value="Single Family">Single Family</option>
                                <option value="Multi Family">Multi Family</option>
                                <option value="Complex">Complex</option>
                                <option value="Land">Land</option>
                            </select>
                            <p>Add image here:</p>
                            <input  className='form-control' type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                            <p>Description:</p>
                            <input className='form-control' type="text" value={description} onChange={e => setDescription(e.target.value)} />
                            <p></p>
                            <button style={{ backgroundColor: "#009AC7" }} type="submit">Add Post</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create