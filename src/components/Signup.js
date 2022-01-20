import { useState,useRef, useEffect } from 'react'
import {Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
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
    

    const pwlen = ()=>{
        // setpassword(e.target.value)
        if(password.current.value.length<8)
            setstatus(1)
        else 
            setstatus(0)
        settrigger(!trigger)
    }

    const pwcheck = (e)=>{
        // setreentered(e.target.value)
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
        if(status==0 && !taken 
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
            dp:'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png',
            place:place.current.value,
            password:password.current.value,
            private:isSwitchOn
        }
        axios.post('http://localhost:8000/auth/signup',data).then(
            (response)=>{
                localStorage.setItem('token',response.data.token)  
            })
    }
    const navigate = useNavigate();
    return (
        <div className="card col-md-6 p-5 m-5 secondary">
            <div className="container">
            <div className="row d-flex justify-content-center mb-3">
                    <h3>Sign up</h3>

                    </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <p>Username :</p>
                    </div>
                    <div className="col-md-6">
                    <input type='text' ref={username} onChange={onusername} className="form-control" placeholder="username"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center ">
                        <div className='col-md-6'>
                    {taken?<p style={{color:'red'}}>username is already taken</p>:<></>}
                    </div>
                    </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <p>Name :</p>
                    </div>
                    <div className="col-md-3">
                    <input type='text' ref={firstname} className="form-control" placeholder="First name"/>
                    </div>
                    <div className="col-md-3">
                    <input type='text' ref={lastname} className="form-control" placeholder="Last name"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <p>Password :</p>
                    </div>
                    <div className="col-md-6">
                    <input type='password' ref={password} onChange={pwlen}  className="form-control" placeholder="password"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <p> Re-enter Password :</p>
                    </div>
                    
                    <div className="col-md-6">
                    <input type='password' ref={reentered} onChange={pwcheck} className="form-control" placeholder="re-enter password"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center ">
                        <div className='col-md-4'>
                    {status===1?<p style={{color:'red'}}>password too short</p>:(
                    status===2?<p style={{color:'red'}}>passwords don't match</p>:<></>
                    )}
                    </div>
                    </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <p>Place :</p>
                    </div>
                    <div className="col-md-6">
                    <input type='text' ref={place} className="form-control" placeholder="place"/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <p> Bio:</p>
                    </div>
                    <div className="col-md-6">
                    <textarea ref={bio} className="form-control" rows='4' placeholder="bio"/>
                    </div>
                </div>

                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-3">
                    <p> Private:</p>
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
                    <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <p>Alreadt have an account?</p><a onClick={()=>navigate('/login')}>Login</a>
                    </div>
                    </div>

                </div>
            </div>

    )
}

