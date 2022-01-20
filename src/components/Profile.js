import User from "./User";
import Feed from "./Feed";
import Addpost from "./Addpost";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Profile(){
    const {username} = useParams();
    const [profile,setprofile] = useState()
    const [list,setlist] = useState()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        const body = {username:username}
        axios.post('http://localhost:8000/users',body,{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            console.log(username)
            setprofile(response.data)
        }).then(()=>{
            axios.post('http://localhost:8000/posts',body,{
                headers:{
                    'x-access-token':token
                }
            }).then((response)=>{
                setlist(response.data)
            })
        })  
        


    },[])

    return <div> 
        {profile?<div className=' row d-flex justify-content-center mt-3 '>
        <User  status={1} followers={profile.followers} following={profile.following} username={profile.username} bio={profile.bio} place={profile.place} dp={profile.dp}/>
        </div>:<div className='card'><p>loading</p></div>}
        <div className="row d-flex justify-content-center">
            <Addpost></Addpost>
        </div>
        <div className=' row d-flex justify-content-center ' >
        <Feed list={list}/>
        </div>
    </div>
}