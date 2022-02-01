import {Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
export default function UserList({list}){
    const navigate = useNavigate()

    const result = list.map((item,key)=>{
        return <Dropdown.Item key={key} onClick={()=>{navigate(`/user/${item.username}`)}} eventKey={key}><img className='userdp rounded-circle' src={item.dp}></img>&emsp;{item.username}</Dropdown.Item>
    })
    return list?.length!=0?result: <Dropdown.Item >No matches found</Dropdown.Item>

}

