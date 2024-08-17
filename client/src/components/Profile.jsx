import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import '../styling/Profile.css';

const Profile = () => {

  const { id } = useParams()

  const [post, setPost] = useState([]);
  const _id = localStorage.getItem("_id")
  const [user, setUser] = useState([]);
  const username = localStorage.getItem("username")
  const image = localStorage.getItem("image")


    // Fetch data on component mount
    useEffect(() => {
      axios.get('http://localhost:8000/api/posts')
          .then(res => {
              console.log("✅✅✅✅ this is post", res.data.posts);
              setPost(res.data.posts);
              
          })
          .catch(err => console.log("❌❌❌❌", err));
  }, []);






  return (
    <div className='profileContain'>
      <div className='top'>
        <img className='profilePicture' src={image} alt='Profile' />
        <p className="username">{username}</p>
      </div>
      
      <h1 className='postWord'>POSTS</h1>
      <div className='postsSection'>
      

        {post.map((onePost) => (
          <p>{onePost.user_id === _id ?
            <div className='post' key={onePost._id}>
            <h2>{onePost.property}</h2>
            <p>{onePost.description}</p>
            <img src={onePost.imageUrl} alt={onePost.property} className='UserPost-image-house' />
          </div>
         : ""}</p>
        ))}  
      </div>
    </div>
  );

}
export default Profile