import {Accordion,Card,Button,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as filledheart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as emptyheart } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt as bin } from '@fortawesome/free-regular-svg-icons'
import { faComment as commentlogo } from '@fortawesome/free-regular-svg-icons'
import Comment from './Comment'
import { useEffect, useState,useContext,useRef } from 'react'
import axios from 'axios'
import { usercontext } from '../App'
import {  useNavigate } from 'react-router-dom'

export default function Post({single,username,dp,img,caption,postid})
{

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const commentbody = useRef('')
  const handleShow = () => setShow(true);
  const context = useContext(usercontext);
  const [commentslist,setcommentslist] = useState([]);
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

    const [lnumber,setlnumber] = useState(0)
    const [hasliked,sethasliked] = useState(0)
    const comments = commentslist.map((item,key)=><Comment postowner={username} commentid={item.commentid} key={key} dp={item.dp} username={item.username} comment={item.comment}></Comment>)
    const [showlikes, setShowlikes] = useState(false);
    const [likeslist,setlikeslist] = useState([])
    const handleCloselikes = () => setShowlikes(false);
 
    const handleShowlikes = () => {
        setShowlikes(true);
        axios.get(`http://localhost:8000/posts/post/${postid}/likes`,{
          headers:{
              'x-access-token':token
          }
      }).then((response)=>{
        setlikeslist(response.data)
      })
    }

    const likesscroll = likeslist?.map((item,key)=>{
        return <>
        <div key={key} className="row m-2" onClick={()=>navigate(`/user/${item.username}`)}>
            <div className="col-2">
            <img className='dp rounded-circle' src={item.dp}></img>
            </div>
            <div className="col-10 d-flex align-items-center">
            <h6>{item.username}</h6>
            </div>
        </div>
        </>
    })



   const like = ()=>{

   const link = hasliked?`http://localhost:8000/posts/post/${postid}/dislike`:`http://localhost:8000/posts/post/${postid}/like`
    axios.post(link,{postid:postid},{
      headers:{
          'x-access-token':token
      }
  }).then((response)=>{
      setlnumber(response.data.likes)
      sethasliked(response.data.hasliked)
  })
} // like ends here 

const getcomments = ()=>{
  axios.get(`http://localhost:8000/posts/post/${postid}/comment`,{
    headers:{
      'x-access-token':token
  }
  }).then((response)=>{
    setcommentslist(response.data)
    
  })
}

const postcomment = ()=>{
  axios.post(`http://localhost:8000/posts/post/${postid}/comment`,
  {comment:commentbody.current.value},{
    headers:{
      'x-access-token':token
  }
  }).then((response)=>{
      window.location.reload()
  })
}



const del = ()=>{

  const link = 'http://localhost:8000/posts/post/'+postid
   axios.delete(link,{
     headers:{
         'x-access-token':token
     }
 }).then((response)=>{
    if(single===true)
      navigate('/')
    else 
      window.location.reload();
 })
} // like ends here 



    useEffect(()=>{
    
      
        axios.post('http://localhost:8000/posts/hasliked',{postid:postid},{
          headers:{
              'x-access-token':token
          }
      }).then((response)=>{
          setlnumber(response.data.likes)
          sethasliked(response.data.hasliked)
      })
    },[])

    return <>

    
<Modal show={showlikes} onHide={handleCloselikes}>
        <Modal.Header className="secondary" closeButton>
          <Modal.Title >Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body className='background fixedbox'>{likesscroll}</Modal.Body>
      </Modal>

<Modal show={show} onHide={handleClose}>
        <Modal.Header className='secondary' closeButton >
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className='secondary'>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer className="secondary">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={del}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    <div data-aos="zoom-in" className={`card ${single?`col-md-6`:`col-md-8`} p-0 my-5 post postcard`} >
      
        <div className="card-header secondary">
            <div className="row">
                <div onClick={()=>navigate(`/user/${username}`)} className="col-2">
                <img className="rounded-circle dp" src={dp}></img>
                </div>
                <div className="col-9 d-flex align-items-center flex-start">
                <h6 onClick={()=>navigate(`/user/${username}`)} className="card-title">{username}</h6>
                </div>  
                {context.user.username===username?<div className="col-1 align-items-center d-flex">
              <a onClick={handleShow}>
                      <FontAwesomeIcon icon={bin}/>
                  </a>
                </div>:<></>}
            </div>
            
        </div>
        <div className="justify-content-center d-flex" >
            <img onDoubleClick={like}
             className="postimg" src={img}></img>
        </div>
        <div className="card-body secondary">
          
            <a onClick={like}>{hasliked?<FontAwesomeIcon style={{color:'red'}} icon={filledheart} size={'lg'}/>:<FontAwesomeIcon icon={emptyheart} size={'lg'}/>}</a>
            <a  onClick={handleShowlikes} style={{display:'inline',textDecoration:'none',color:'black'}} className="card-text secondary">&emsp; likes: <h6 style={{display:"inline"}}>{lnumber}</h6></a>
            <p className="card-text font-weight-bold">{caption}</p>
        </div>
 


 {/* comments section */}
        <Accordion className='secondary'>
          <Accordion.Item className='secondary' eventKey='0'>
            <Accordion.Header onClick={getcomments}>
              <h6>Comments</h6>&emsp;<FontAwesomeIcon icon={commentlogo}></FontAwesomeIcon>
            </Accordion.Header>
            <Accordion.Body>
                {comments}
            <div className='row'>
              <div className='col-2 d-flex align-items-center'>
                  <img src={dp} className='rounded-circle dp'></img>
               </div>
                <div className='col-8 d-flex align-items-center'>
                  <input type='text' ref = {commentbody} className='form-control' placeholder='add comment here ..'></input>
               </div>
               <div className='col-2 d-flex align-items-center'>
                  <button className='btn btn-primary btn-sm' onClick={postcomment}>Add</button>
               </div>
            </div>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
        
        
    </div>
    </>
}