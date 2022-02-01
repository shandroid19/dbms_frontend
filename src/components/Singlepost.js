import { useEffect,useState } from "react"
import Post from "./Post"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function Singlepost()
{
    const {postid} = useParams();
    const [item,setitem] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8000/posts/post/'+postid,{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            if (response.data)
                setitem(response.data)
            else
                navigate('/')
        })
    
    },[])
    return (Object.keys(item).length?<div className='row d-flex justify-content-center'><Post single={true} postid={item?.postid} username={item?.username} dp={item?.dp} img={item?.img}
     caption={item?.caption}/></div>:<></>)
    
}