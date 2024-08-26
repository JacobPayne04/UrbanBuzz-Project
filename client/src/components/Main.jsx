// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/Main.css';


//delete post - fidn delete function - 30 min max
//view profile by id - piggy off of main - 1 hour max
//show the user that posted - 50% done - 1 hour max

//#TODO - make post for in a constructible way and fix the css on profile page! - 1 hour max 


//trying to see

const Main = () => {
    // Initialize state for posts
    const [post, setPost] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([])


    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
            .then(res => {
                //console.log("✅✅✅✅ this is users", res.data)
                setUsers(res.data.users)
            })
            .catch(err => console.log("❌❌❌❌", err))

    }, [])

    // Fetch data on component mount
    useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
            .then(res => {
               // console.log("✅✅✅✅ this is post", res.data.posts);
                setPost(res.data.posts);
                
            })
            .catch(err => console.log("❌❌❌❌", err));
    }, []);

//for deleting post
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
      

    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
            .then(res => {
               // console.log("✅✅✅✅", res.data)
                setUser(res.data.users)
            })
            .catch(err => console.log("❌❌❌❌", err))

    }, [])





    return (
        <div>
        <div className="body">
            {/* Iterate over posts and display each in a UserPost div */}
            {post.map((onePost) => (
                <div className='UserPost' key={onePost._id}>
                    <div className="userImageAndUserName">
                        {user.map((oneUser) => {
                            const combo = onePost.user_id === oneUser._id;
                            return combo ? (
                                <div className='userInfo' key={oneUser._id}>
                                    <img className='UserPost-image' src={oneUser.image} alt="" />
                                    <h2 className='UsernameTemplate'>{oneUser.username}</h2>
                                </div>
                            ) : null;
                        })}
                    </div>
                    <h2>{onePost.property}</h2>
                
                   
                    <img src={onePost.imageUrl} alt={onePost.property} className='UserPost-image-house' />
                    <div className='descriptionArea'>
                    <p className='description'> Description </p>
                    <p> {onePost.description}</p> 
                    </div>
                    
                </div>
            ))}
    </div>
    <div>
    <footer class="footerMain">
        <div class="footer-container">
            <div class="footer-column">
                <h3>UrbanBuzz</h3>
                <p>Your source for urban lifestyle news and trends.</p>
            </div>
            <div class="footer-column">
                <h4>Contact Us</h4>
                <p>Email: contact@urbanbuzz.com</p>
                <p>Phone: +1 234 567 890</p>
            </div>
            <div class="footer-column">
                <h4>Follow Us</h4>
                <ul class="social-links">
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">LinkedIn</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>Quick Links</h4>
                <ul class="footer-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 UrbanBuzz. All rights reserved.</p>
        </div>
    </footer>
    </div>

    </div>
    
    );

    
};





export default Main;




