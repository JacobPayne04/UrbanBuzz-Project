import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Main from '../src/components/Main';
import Register from '../src/components/Login';
import Login from './components/Login';
import Message from './components/Message';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Create from './components/Create';
import LoginAndReg from './components/LoginAndReg';

function App() {
  const username = localStorage.getItem("username")

  const navigate = useNavigate()

  const SignOut = () => {
    navigate("/")
    localStorage.clear();
  }

  return (
    <div className='allNav'>
      {username ?
        <>

          <div className="App">

            <div className='navContainer'>

              <div className='here'>
                <h1>Urban-buzz</h1>
              </div>
              <div className='nav-bar'></div>

              <div className='btnbox '> 
                  <Link to={"/main"}> <button className='navbtn btn btn-primary'>Home</button></Link>
                  <p></p>
                  <Link to={"/profile"}> <button className='navbtn btn btn-primary'>Profile</button></Link>
                  <p></p>
                  <Link to={"/message"}> <button className='navbtn btn btn-primary'>messages</button></Link>
                  <p></p>
                  <Link to={"/create"}> <button className='navbtn btn btn-primary'>Add Post</button></Link>
                  <p></p>
                  <button className='navbtn btn btn-primary' onClick={() => SignOut()}>Sign Out</button>              
              </div>

            </div>


            <div>

              <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/create" element={<Create />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Register />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/message" element={<Message />} />
                <Route path="/loginreg" element={<LoginAndReg />} />
                <Route path="*" element={< Navigate to={"/User"} />} />
              </Routes>
            </div>
          </div>



        </>
        : <LoginAndReg />}
    </div>
  );
}

export default App;
