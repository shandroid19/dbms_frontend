import { useEffect,useState } from "react"
import {useNavigate} from 'react-router-dom'
import Feed from "./Feed"
import Recommendations from "./Recommendations"


const axios = require('axios')
export default function Home() {
  const navigate = useNavigate();
  const [list,setlist] = useState()
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.post('http://localhost:8000/posts/home',{},{
      headers:{
          'x-access-token':token
      }
  }).then((response)=>{
    setlist(response.data)
  }).catch((err)=>{
      navigate('/login')
  })
  },[])



     return <div className='row d-flex justify-content-center'>
       <div className='row'>
  <div className="col-md-8">
      <Feed list={list}/>
      </div>
      <div  style={{position:'fixed',right:'2rem'}} className="col-4 d-none d-sm-none d-md-block ">
      <Recommendations ></Recommendations>
      </div>
      </div>
      </div>
  }