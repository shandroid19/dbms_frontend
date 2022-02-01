import User from "./User";
import Feed from "./Feed";
import Addpost from "./Addpost";
import { useParams } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { usercontext } from "../App";
import axios from "axios";
import UserFeed from "./UserFeed";
export default function Profile(){
    const {username} = useParams();
    const [profile,setprofile] = useState()
    const [list,setlist] = useState()
    const context = useContext(usercontext)
    const loadingCard =   <div className="row d-flex justify-content-center">
    <div className="col-10 secondary card p-5 m-5">
                <div className="row d-flex justify content center">
                    <div className="col-5">
                        <div className="card-text">Loading user Data...</div>
                    </div>
                </div>
                         </div>
                         </div>


    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        const body = {username:username}
        axios.post('http://localhost:8000/users',body,{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
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
        


    },[username])

    return <div> 
        {profile?<div className='row d-flex justify-content-center mt-3 '>
        <User  status={profile.status} followers={profile.followers} following={profile.following} username={profile.username} bio={profile.bio} place={profile.place} priv={profile.private} dp={profile.dp}/>
        </div>:loadingCard}
        {username===context.user.username?<div data-aos='fade-up' className="row d-flex justify-content-center">
            <Addpost></Addpost>
        </div>:<></>}
        <div className="container d-flex justify-content-center" >
            <div className='row d-flex justif align-items-center' style={{width:'100%'}} >
        {/* <Feed list={list}/> */}
        {list?.length?<div className='row d-flex justify-content-center' style={{textAlign:'center'}}>
            <div className="display-4"   >Posts</div>
        </div>:<></>}
        <UserFeed list={list}/>
        </div>
        </div>
    </div>
}