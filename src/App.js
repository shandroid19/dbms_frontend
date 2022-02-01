import './App.css';
import {BrowserRouter as Router,Route,Routes,Link, useNavigate} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Feed from './components/Feed'
import NotificationMenu from './components/NotificationMenu'
import Login from './components/Login';
import UserList from './components/Userlist';
import Profile from './components/Profile';
import Signup from './components/Signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell,faAngleDoubleUp as up} from '@fortawesome/free-solid-svg-icons'
import { useState,createContext,useEffect,forwardRef } from "react";
import {Dropdown,FormControl} from 'react-bootstrap'
import axios from 'axios';
import Singlepost from './components/Singlepost';
import AOS from 'aos';
import 'aos/dist/aos.css';
export const usercontext = createContext();

function App() {

  const [user,setuser] = useState({username:'',dp:''});
  const [userlist,setuserlist] = useState([])
  const [value, setValue] = useState('');
  const [notificationlist,setnotificationlist]=useState([])
  const [showButton, setShowButton] = useState(false);


  const notificationrequest = ()=>{
    const token = localStorage.getItem('token')
    axios.post('http://localhost:8000/users/notifications',{},{
      headers:{
          'x-access-token':token
      }
  }).then((response)=>{
      setnotificationlist(response.data)
  })
  }

  const deletenotifications = ()=>{
    const token = localStorage.getItem('token')
    axios.delete('http://localhost:8000/users/notifications',{
      headers:{
          'x-access-token':token
      }
  }).then((response)=>{
      console.log(response.data.message)
  })
  }

  const  UsermenuToggle = forwardRef(({ children, onClick }, ref) => (
    <button className='btn btn-sm nav-link'
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    > Search users
      {children}
    </button>
  ));

  const NotificationToggle = forwardRef(({ children, onClick }, ref) => (
    <button className='btn btn-sm '
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
        notificationrequest();
      }}
    ><FontAwesomeIcon icon={faBell}/>

      {children}
    </button>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const search = (e) => {
    setValue(e.target.value)
    axios.post('http://localhost:8000/users/search',{username:e.target.value}).then((response)=>{
    setuserlist(response.data)
    })
  }
    
  

  const Usermenu = forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
  
      return (
        
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="type username here"
            onChange={search}
            value={value}
          />
          <ul className="list-unstyled">
              {children}
          </ul>
        </div>
      );
    },
  );
  
const navigate = useNavigate()
  useEffect(()=>{
    AOS.init({duration:500})
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });

    if(user?.username==='' || !user){

        const use = JSON.parse(localStorage.getItem('user'))
        if(use)
        setuser(use)
        else
      {
          navigate('/login')
      }
      
      
  }
  else
  {
    setuser(JSON.parse(localStorage.getItem('user')))
  }


  },[])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
  


  return (
    <usercontext.Provider value={{user,setuser}}>
    <div className='background' >
    {showButton && (
        <button onClick={scrollToTop} className="back-to-top rounded-circle btn btn-lg">
          <FontAwesomeIcon icon={up}></FontAwesomeIcon>
        </button>
      )}
{user?.username!==''?<nav className=" navbar navbar-expand navbar-light " style={{boxShadow:'0 0 2rem black,0 0 0.5rem grey'}} >
{/* style={{boxShadow:'0 0 2rem #9cfff5,0 0 0.5rem #fff'}} */}
  <div className="container">
    <Link className="navbar-brand" to='/'><img className='navbar-logo' style={{height:'3rem',width:'3rem'}} src='https://www.seekpng.com/png/full/32-328247_green-earth-png-go-green-earth-logo-png.png'></img>&nbsp;Social</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li>
          
        <Dropdown>
    <Dropdown.Toggle style={{display:"none"}} as={UsermenuToggle} id="dropdown-custom-components">
        
    </Dropdown.Toggle>
    <Dropdown.Menu as={Usermenu}>
      <UserList list={userlist}/>
    </Dropdown.Menu>
  </Dropdown>
        </li>
      </ul>

  <Dropdown>
    <Dropdown.Toggle style={{display:"none"}} as={NotificationToggle} id="dropdown-custom-components">
        
    </Dropdown.Toggle>
    <Dropdown.Menu >
      <NotificationMenu list={notificationlist}/>
      <Dropdown.Item >
        {notificationlist.length?<div className='row d-flex justify-content-center'>
          <div className='col-8'>
        <button className='btn btn-danger btn-sm' onClick={deletenotifications} style={{width:'100%'}}>delete all</button>
        </div>
        </div>:<p>No new notifications :)</p>}
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
      &emsp;
      <Link to={`user/${user?.username}`}><img  className = 'dp rounded-circle'src={user?.dp}></img></Link>    
      <div className='m-4'>
      <button onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('user');window.location.reload();}} className='btn btn-danger btn-sm '>logout</button>
      </div>
      </div>
  </div>
</nav>:<></>}


      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/post' element={<div className='row d-flex justify-content-center' styl={{height:"100%"}}><Feed/></div>}/>
      <Route  path='/user/:username' element={<div className='row d-flex justify-content-center'><Profile/></div>}/>
      <Route  path='/login' element={<div className='row d-flex justify-content-center'><Login/></div>}/>
      <Route  path='/signup' element={<div className='row d-flex justify-content-center'><Signup/></div>}/>
      <Route  path='/singlepost/:postid' element={<div className='row d-flex justify-content-center'><Singlepost/></div>}/>
      </Routes>
    </div>
    </usercontext.Provider>
  );
}

export default App;
