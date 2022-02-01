import axios from "axios"

export default function Otheruser({username,bio,dp,place,status,followers,following,priv})
{
    const token = localStorage.getItem('token')


    const accept = ()=>{
        axios.post('http://localhost:8000/users/accept',{username:username},{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            window.location.reload();
        })
    }

    const cancel = ()=>{
        axios.post('http://localhost:8000/users/cancel',{username:username},{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            window.location.reload();
        })
    }

    const reject = ()=>{
        axios.post('http://localhost:8000/users/reject',{username:username},{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            window.location.reload()
        })
    }

    const follow = ()=>{
        const req = priv?'request':'follow'
        axios.post('http://localhost:8000/users/'+req,{username:username},{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            window.location.reload();
        })
    }

    const unfollow = ()=>{
        axios.post('http://localhost:8000/users/unfollow',{username:username},{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            window.location.reload();
        })
    }

    return <div className='card p-4 m-5 col-md-8 secondary'>
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-4 d-flex align-items-center'>
                    <img className='profilepic rounded-circle' src={dp}></img>
                </div>
                <div className='col-md-5'>
                    <h5>{username}</h5>
                    <h6>{place}</h6>
                    Followers: <h6 className='sameline'>{followers}</h6>&emsp;Following: <h6 className='sameline'>{following}</h6>
                    <p>{bio}</p>
                    <div className='row'>
                        {status===0?<button onClick={follow} className='btn col-sm-5 btn-primary' >Follow</button>:
                        (status===1?<button onClick={unfollow} className='btn col-sm-5 btn-outline-secondary' >Unfollow</button>:
                        (status===2?<div><button onClick={cancel} className='btn col-sm-5 btn-outline-secondary'>Requested</button></div>:
                        (status===3?<div><button onClick={accept} className='btn col-sm-5 btn-primary'>Accept</button>&emsp;
                        <button onClick={reject} className='btn col-sm-5 btn-danger'>Reject</button> </div>:<></>)
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}