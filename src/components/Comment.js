import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext,useState } from "react"
import { useNavigate } from "react-router-dom"
import { usercontext } from "../App"
import { Modal,Button } from "react-bootstrap"
import axios from "axios"



export default function Comment({commentid,dp,username,comment,postowner}){
const navigate = useNavigate()
const context = useContext(usercontext)
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const del = ()=>{
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:8000/posts/comments/${commentid}`,{
        headers:{
            'x-access-token':token
        }
    }).then((response)=>{
        window.location.reload()
    })
}

return <div>

<Modal show={show} onHide={handleClose}>
        <Modal.Header className='secondary' closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className='secondary'>Are you sure you want to delete the comment?</Modal.Body>
        <Modal.Footer className='secondary'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={del}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    <div className='row border-bottom border-white my-2' >
        <div className='col-2  ' onClick={()=>navigate(`/user/${username}`)}>
            <img src={dp} className='rounded-circle userdp'></img>
        </div>
        <div className='col-9 '>
            <h6>{username}</h6>
            <p>{comment}</p>
        </div>
        <div className="col-1 d-flex align-items-center">
            {username===context.user.username || context.user.username===postowner?<a onClick={handleShow}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></a>:<></>}
        </div>
    </div>
</div>
}