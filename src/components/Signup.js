import { useState,useRef, useEffect, useContext } from 'react'
import {Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {usercontext} from '../App'

var axios = require('axios')
export default function Signup()
{
    const [status, setstatus,] = useState(0)
    const [taken, settaken,] = useState(false)
    const [valid,setvalid] = useState(false)
    const username = useRef('')
    const firstname = useRef('')
    const lastname = useRef('')
    const bio = useRef('')
    const password = useRef('')
    const reentered= useRef('')
    const place=useRef('')
    const [isSwitchOn,setIsSwitchOn] = useState(true)
    const [trigger,settrigger] = useState(true)
    const context = useContext(usercontext)
    const [autherr,setautherr] = useState(false)
    const navigate = useNavigate();
    const [image,setImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png')
    const [loading,setloading] = useState(false)

    const pwlen = ()=>{
        if(password.current.value.length<8)
            setstatus(1)
        else 
            setstatus(0)
        settrigger(!trigger)
    }

    const pwcheck = (e)=>{
        if(password.current.value.length===reentered.current.value.length)
            setstatus(0)
        else 
            setstatus(2)
        settrigger(!trigger)

    }

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
      };

    function onusername(e){
        // setusername(e.target.value)
        axios.post('http://localhost:8000/auth/checkname',{username:username.current.value})
        .then((response)=>{
            settaken(response.data.taken)
            settrigger(!trigger)
        })

    }
    useEffect(()=>{
        if(status===0 && !taken 
                && password.current.value.length!==0 
                &&  reentered.current.value.length!==0
                && username.current.value.length!==0)
            setvalid(true)
        else
            setvalid(false)
    },[trigger])

    function onsubmit()
    {
        const data = {
            username:username.current.value,
            name:firstname.current.value+" "+lastname.current.value,
            bio:bio.current.value,
            dp:image,
            place:place.current.value,
            password:password.current.value,
            private:isSwitchOn
        }
        axios.post('http://localhost:8000/auth/signup',data).then(
            (response)=>{
                console.log(response.data.token)
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('user',JSON.stringify(response.data.user))
                context.setuser(response.data.user)
                navigate('/')
                console.log('logged in successfully')
            }).catch((err)=>{
                setautherr(true)
            })
    }


    const uploadImage = async e=> {
        setloading(true)
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset','dbms_mini')
        let filname=files[0].name.toLowerCase();
        if(!(filname.endsWith('.jpg')||filname.endsWith('.png')||filname.endsWith('.jpeg')))
          {
            alert("Only '.png' , '.jpg' and '.jpeg' formats supported!");
            return;
          }          
        const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
        {
            method: 'POST',
            body:data
        })
        const file = await res.json()
        const link = file.secure_url
        const cropped = link.slice(0,50)+'c_fill,h_200,w_200,dpr_auto'+link.slice(49)
        setImage(cropped);
        setloading(false)
  
    }


    return (
        <div className="card col-md-6 p-5 m-5 secondary">
            <div className="container">
            <div className="row d-flex justify-content-center mb-3">
                    <h3>Sign up</h3>

                    </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6>Username </h6>
                    </div>
                    <div className="col-md-6">
                    <input type='text' ref={username} onChange={onusername} className="form-control" placeholder="username"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center ">
                        <div className='col-md-6'>
                    {taken?<h6 style={{color:'red'}}>username is already taken</h6>:<></>}
                    </div>
                    </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6>Name </h6>
                    </div>
                    <div className="col-md-3 my-2">
                    <input type='text' ref={firstname} className="form-control" placeholder="First name"/>
                    </div>
                    <div className="col-md-3 my-2">
                    <input type='text' ref={lastname} className="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6>profile picture </h6>
                    </div>
                    <div className="col-md-6">
                        <div className='row'>
                <div className="image-upload mb-2 col-6">
                    <label htmlFor="file-input">
                    <img className='profilepic' src={image}/>
                    </label>
                    <input id="file-input" type="file" 
                    onChange={uploadImage}
                    />                 
                 </div>
                 {loading?<div className='col-4 d-flex align-items-center'>
                 <div className="spinner-border text-primary" role="status">
                         <span className="sr-only"></span>
                    </div>
                    </div>:<></>}
                    </div>
                 </div>
                 </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6>Password </h6>
                    </div>
                    <div className="col-md-6">
                    <input type='password' ref={password} onChange={pwlen}  className="form-control" placeholder="password"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6> Re-enter Password </h6>
                    </div>
                    
                    <div className="col-md-6">
                    <input type='password' ref={reentered} onChange={pwcheck} className="form-control" placeholder="re-enter password"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center ">
                        <div className='col-md-6'>
                    {status===1?<h6 style={{color:'red'}}>password too short</h6>:(
                    status===2?<h6 style={{color:'red'}}>passwords don't match</h6>:<></>
                    )}
                    </div>
                    </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6>Place </h6>
                    </div>
                    <div className="col-md-6">
                    <input type='text' ref={place} className="form-control" placeholder="place"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6> Bio</h6>
                    </div>
                    <div className="col-md-6">
                    <textarea ref={bio} className="form-control" rows='4' placeholder="bio"/>
                    </div>
                </div>

                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <h6> Private</h6>
                    </div>
                    <div className="col-md-6">
                    <Form.Check 
                    type="switch"
                    id="custom-switch"
                    onChange={onSwitchAction}
                    checked={isSwitchOn}
                    />
                    </div>
                </div>
                


                    <div className="row d-flex justify-content-center mb-3">
                    <div className="col-6 d-flex justify-content-center">
                    <button disabled={!valid} onClick={onsubmit} className="btn btn-primary">Sign up</button>
                    </div>
                    </div>
                    {autherr?<h6 style={{color:'red'}}>there was a problem signing in</h6>:<></>}
                    <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <p>Already have an account?</p><a onClick={()=>navigate('/login')}>Login</a>
                    </div>
                    </div>

                </div>
            </div>

    )
}

