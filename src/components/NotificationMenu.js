import {Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function NotificationMenu({list}){
    

    const navigate = useNavigate()
    return list.map((item,key)=>{
        const dict = {
        0:`${item.username} has requested to follow you`,
        1:`${item.username} started following you`,
        2:`${item.username} liked your post`,
        3:`${item.username} commented on your post`
    }

    const request = ()=>{
        const token = localStorage.getItem('token')
        const link = item.postid!==0?`/singlepost/${item.postid}`:`/user/${item.username}`
        axios.post('http://localhost:8000/users/removenotification',{
            username:item.username,
            receiver:item.receiver,
            type:item.type,
            postid:item.postid
        },{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            navigate(link)
        })
    }
        // return <Dropdown.Item eventKey={key}><img className='dp rounded-circle' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jYFXdVooszBgHKsDFCtWruhsIUF9x-iJsw&usqp=CAU'></img>&emsp;{item}</Dropdown.Item>
        return <Dropdown.Item key={key} eventKey={key} onClick={request}>
            <img className='notifydp rounded-circle' 
            src={item.dp}>
                </img>&emsp;{dict[item.type]}
            </Dropdown.Item>
    })

}

