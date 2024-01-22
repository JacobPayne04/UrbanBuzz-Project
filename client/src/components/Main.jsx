// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/Main.css';


//delete post - fidn delete function - 30 min max
//view profile by id - piggy off of main - 1 hour max
//show the user that posted - 50% done - 1 hour max



const Main = () => {
    // Initialize state for posts
    const [post, setPost] = useState([]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
            .then(res => {
                console.log("✅✅✅✅ this is users", res.data)
                setUsers(res.data.users)
            })
            .catch(err => console.log("❌❌❌❌", err))

    }, [])

    // Fetch data on component mount
    useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
            .then(res => {
                console.log("✅✅✅✅ this is post", res.data.posts);
                setPost(res.data.posts);
                
            })
            .catch(err => console.log("❌❌❌❌", err));
    }, []);


    const deletePost = (deleteId) => {
        axios.delete("http://localhost:8000/api/posts/" + deleteId) 
            .then(res => {
                console.log("OKAY DELTED", res.data);
                const filteredPost = post.filter((eachPost) => {
                    return eachPost._id !== deleteId;
            });
            setPost(filteredPost);
    })
        .catch(err => console.log("❌❌❌❌", err));
    };
      




    return (
        <div className="body">
            {/* Iterate over posts and display each in a UserPost div */}
            {post.map((onePost) => (
                <div className='UserPost' key={onePost._id}>
                    <h2>{onePost.property}</h2>
                    <p>{onePost.description}</p>
                      {/* <button onClick={() => deletePost(onePost._id)} className='delete-button'>Delete Post</button> */}
                    <img src={onePost.imageUrl} alt={onePost.property} className='UserPost-image' />
                </div>
            ))}

    </div>
    );
};





export default Main;
