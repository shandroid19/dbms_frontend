import {Accordion,Card,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as filledheart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as emptydheart } from '@fortawesome/free-regular-svg-icons'
import Comment from './Comment'
export default function Post({username,dp,img,caption,likes})
{
    const commentslist = [
      {username:"laksh",comment:"hey",dp:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeN0QFLTRhSZW2cbqMh_PWb_TBSuqjZ5Gv4Q&usqp=CAU"},
      {dp:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jYFXdVooszBgHKsDFCtWruhsIUF9x-iJsw&usqp=CAU",username:"shan",comment:"hello"}
    ]
    const comments = commentslist.map((item,key)=><Comment key={key} dp={item.dp} username={item.username} comment={item.comment}></Comment>)


    return <>
    <div className="card  col-6 p-0 my-5 post">
      
        <div className="card-header secondary">
            <div className="row">
                <div className="col-1">
                <img className="rounded-circle dp" src={dp}></img>
                </div>
                <div className="col-10 d-flex align-items-center flex-start">
                <h6 className="card-title">{username}</h6>
                </div>  
            </div>
            
        </div>
        <div className="justify-content-center d-flex bg-dark">
            <img className="postimg"  src={img}></img>
        </div>
        <div className="card-body secondary">
          
            <FontAwesomeIcon icon={filledheart}/>
            <p style={{display:'inline'}} className="card-text">&emsp; likes: <h6 style={{display:"inline"}}>{likes}</h6></p>
            <p className="card-text font-weight-bold">{caption}</p>
        </div>
        <Accordion className='secondary'>
          <Accordion.Item className='secondary' eventKey='0'>
            <Accordion.Header>
              <h6>Comments</h6>
            </Accordion.Header>
            <Accordion.Body>
                {comments}
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          
      {/* <Accordion defaultActiveKey="0">

<Card>
  <Card.Header>
    <Accordion.Toggle as={Button} variant="link" eventKey="0">
      Panel 1
    </Accordion.Toggle>
  </Card.Header>

  <Accordion.Collapse eventKey="0">
    <Card.Body>Body content for panel 1</Card.Body>
  </Accordion.Collapse>
</Card>

<Card>
  <Card.Header>
    <Accordion.Toggle as={Button} variant="link" eventKey="1">
      Panel 2
    </Accordion.Toggle>
  </Card.Header>

  <Accordion.Collapse eventKey="1">
    <Card.Body>Body content for panel 2</Card.Body>
  </Accordion.Collapse>
</Card>

</Accordion> */}
        
    </div>
    </>
}