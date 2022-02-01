import { useState ,useRef, useEffect,useContext } from 'react'
import {useNavigate} from 'react-router-dom';
import {usercontext} from '../App'
const axios = require('axios')


export default function Login()
{
    const [status, setstatus,] = useState(0)
    const username = useRef('')
    const password = useRef('')
    const navigate = useNavigate();
    const context = useContext(usercontext)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token)
        {
            axios.post('http://localhost:8000/auth/verify',{},{ 
                headers:{
                    'x-access-token':token
                }
            }).then((res)=>{
                if(res.status===200)
                {
                    if(res.data.auth)
                    {
                        context.setuser(JSON.parse(localStorage.getItem('user')))
                        navigate('/')
                    }
                }
                else{
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                }
            }).catch((err)=>{
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            })
        }
    },[])

    const onSubmit = ()=>{
        axios.post('http://localhost:8000/auth/login',{
            username:username.current.value,
            password:password.current.value
        }).then((response)=>{
            if(response.status===200)
            {
                if(response.data.auth)
                    {
                        localStorage.setItem('token',response.data.token)
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        context.setuser(response.data.user)
                        navigate('/')
                        console.log('logged in successfully')
                    }
            }
        }).catch((err)=>{
            if(err.response.status===401){
                setstatus(2)
                console.log('wrong password')
        }
    else if(err.response.status===404){
        setstatus(1)
        console.log('username not found')
}
        })
    }

    return (
        <div className="card col-sm-7 col-lg-4 p-5 m-5 secondary">
            <div className="container">
            <div className="row d-flex justify-content-center mb-3">
                    <h3>Login</h3>

                    </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-10">
                    <input type='text' ref={username} className="form-control" placeholder="username"/>
                    </div>
                    </div>
                    <div className="row d-flex justify-content-center my-3">
                    <div className="col-10 ">
                    <input type='password' ref={password} className="form-control" placeholder="password"/>
                    </div>
                    </div>
                    <div className="row d-flex justify-content-center ">
                        <div>
                    {status===1?<p style={{color:'red'}}>invalid username</p>:(
                    status===2?<p style={{color:'red'}}>incorrect password</p>:<></>
                    )}
                    </div>
                    </div>
                    <div className="row d-flex justify-content-center mb-3">
                    <div className="col-6 d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={onSubmit}>Login</button>
                    </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <p>Don't have an account?</p><a onClick={()=>navigate('/signup')}>Sign in</a>
                    </div>
                    </div>
                 
                </div>
            </div>

    )
}