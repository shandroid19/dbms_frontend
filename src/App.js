import './App.css';
import {BrowserRouter as Router,Route,Routes,Link, Redirect, useNavigate} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Feed from './components/Feed'
import NotificationMenu from './components/NotificationMenu'
import Login from './components/Login';
import UserList from './components/Userlist';
import Profile from './components/Profile';
import Signup from './components/Signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState,createContext,useEffect,forwardRef,Children } from "react";
import {Dropdown,DropdownButton,FormControl} from 'react-bootstrap'
export const usercontext = createContext();

function App() {

  const [user,setuser] = useState({username:'',dp:''});
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
    <button className='btn btn-sm nav-link'
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    ><FontAwesomeIcon icon={faBell}/>

      {children}
    </button>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const Usermenu = forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
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
            onChange={(e) => setValue(e.target.value)}
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
  //   setuser({
  //   username:'shan',
  //   dp:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jYFXdVooszBgHKsDFCtWruhsIUF9x-iJsw&usqp=CAU',
  // })
  console.log(user)

    if(user?.username==='' || !user){
      
        const use = JSON.parse(localStorage.getItem('user'))
        if(use)
        setuser(use)
        else
      {
          navigate('/login')
          console.log('had to navigate')
      }
      
      
  }
  else
  {
    setuser(JSON.parse(localStorage.getItem('user')))
  }


  },[])
  


  return (
    <usercontext.Provider value={{user,setuser}}>
    <div className='background'>
{user?.username!==''?<nav className="secondary navbar navbar-expand-lg navbar-light " style={{boxShadow:'0 0 2rem #9cfff5,0 0 0.5rem #fff'}}>
  <div className="container">
    <Link className="navbar-brand" to='/'>Social</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to='login'>Login</Link>
        </li>

        <li className="nav-item ">
          <Link className="nav-link" to='post' role="button" >
            posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to='signup' className="nav-link">Signup</Link>
        </li>
        <li>
          
        <Dropdown>
    <Dropdown.Toggle style={{display:"none"}} as={UsermenuToggle} id="dropdown-custom-components">
        
    </Dropdown.Toggle>
    <Dropdown.Menu as={Usermenu}>
      <UserList list={['shan']}/>

    </Dropdown.Menu>
  </Dropdown>
        </li>
      </ul>

         <Dropdown>
    <Dropdown.Toggle style={{display:"none"}} as={NotificationToggle} id="dropdown-custom-components">
        
    </Dropdown.Toggle>
    <Dropdown.Menu >
      <NotificationMenu list={['not1']}/>

    </Dropdown.Menu>
  </Dropdown>
      &emsp;
      <Link to={`user/${user?.username}`}><img  className = 'dp rounded-circle'src={user?.dp}></img></Link>    
      <button onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('user');window.location.reload();}} className='btn btn-danger btn-sm mx-3'>logout</button>
      </div>
  </div>
</nav>:<></>}


      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/post' element={<div className='row d-flex justify-content-center'><Feed/></div>}/>
      <Route  path='/user/:username' element={<div className='row d-flex justify-content-center'><Profile/></div>}/>
      <Route  path='/login' element={<div className='row d-flex justify-content-center'><Login/></div>}/>
      <Route  path='/signup' element={<div className='row d-flex justify-content-center'><Signup/></div>}/>

      </Routes>
    </div>
    </usercontext.Provider>
  );
}

export default App;
