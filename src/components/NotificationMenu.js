import {Dropdown } from 'react-bootstrap'
export default function NotificationMenu({list}){
    return list.map((item,key)=>{
        return <Dropdown.Item eventKey={key}><img className='dp rounded-circle' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jYFXdVooszBgHKsDFCtWruhsIUF9x-iJsw&usqp=CAU'></img>&emsp;{item}</Dropdown.Item>
    })

}

