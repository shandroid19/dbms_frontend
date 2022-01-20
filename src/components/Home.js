import { useEffect,useState } from "react"
import {useNavigate} from 'react-router-dom'
import Feed from "./Feed"

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
    console.log('erred')
      navigate('/login')
  })
  },[])

  // const default_list = [{username:'ur at home silly',dp:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALZAcoGIUr4WMJpsN3PqonWdIMd1oGXpbow&usqp=CAU",
  // img:"https://recenthighlights.com/wp-content/uploads/2020/11/One-Piece-995.jpg",
  // caption:"zoro n luffy",likes:3450}]

     return <div className='row d-flex justify-content-center'>
       
      <Feed list={list}/>
      </div>
  }