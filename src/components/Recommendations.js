import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Recommendations(){

    const [users,setusers] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:8000/users/recommendations',{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            setusers(response.data)
        })
    },[])




    function User({username,priv,dp}){
        const [status,setstatus] = useState(0)

        const cancel = ()=>{
            axios.post('http://localhost:8000/users/cancel',{username:username},{
                headers:{
                    'x-access-token':token
                }
            }).then((response)=>{
                setstatus(0)
            })
        }

        const unfollow = ()=>{
            axios.post('http://localhost:8000/users/unfollow',{username:username},{
                headers:{
                    'x-access-token':token
                }
            }).then(()=>{
                setstatus(0)
            })
        }

        const follow = ()=>{

            const req = priv?'request':'follow'
            axios.post('http://localhost:8000/users/'+req,{username:username},{
                headers:{
                    'x-access-token':token
                }
            }).then((response)=>{
                setstatus(priv?2:1)
            })
        }

        return ( <div className="row my-1" >
        <div className="col-4" onClick={()=>navigate(`/user/${username}`)}>
        <img className='userdp rounded-circle' src={dp}></img>
        </div>
        <div className="col-4 d-flex align-items-center" onClick={()=>navigate(`/user/${username}`)}>
            <h6 >{username}</h6>
        </div>
        <div className="col-3" >
            {status===0?<button onClick={follow} className="btn btn-primary btn-sm">Follow</button>:(status===1?<button onClick={unfollow} className="btn btn-secondary-outine btn-sm">Following</button>:<button onClick={cancel} className="btn btn-secondary-outline btn-sm">Requested</button>)}
        </div>
        
    </div>)
    }

    const list = users?.map((item)=>{ return <User key={item.username} username={item.username} priv={item.private} dp={item.dp}/>})

    return(<div data-aos='fade-right' className=" secondary card p-2 mt-5" >
        <h4 className='m-3'>Suggestions</h4>
        <div className="container">
        {list?.length?list:<p>No Suggestions</p>}
        </div>
    </div>)
}

