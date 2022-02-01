import { useRef, useState,useContext } from "react"
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../App";
const axios  = require('axios')


export default function Current({username,bio,dp,place,followers,following})
{
    const token = localStorage.getItem('token')
    const [edit,setedit] = useState(false)
    const [showfollowers, setShowfollowers] = useState(false);
    const [followerslist,setfollowerslist] = useState([])
    const [followinglist,setfollowinglist] = useState([])
    const newplace = useRef();
    const newbio = useRef();
    const [image,setImage] = useState()
    const navigate = useNavigate()
    const context = useContext(usercontext)

    const handleClosefollowers = () => setShowfollowers(false);


    const uploadImage = async e=> {
      const files = e.target.files
      const data = new FormData()
      data.append('file',files[0])
      data.append('upload_preset','dbms_mini')
      let filname=files[0].name.toLowerCase();
      if(!(filname.endsWith('.jpg')||filname.endsWith('.png')||filname.endsWith('.jpeg')))
        {
          alert("Only '.png' , '.jpg' and '.jpeg' formats supported!");
          return;
        }          
      const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
      {
          method: 'POST',
          body:data
      })
      const file = await res.json()
      const link = file.secure_url
      const cropped = link.slice(0,50)+'c_fill,h_200,w_200,dpr_auto'+link.slice(49)
      setImage(cropped);

  }

 
    const handleShowfollowers = () => {
        setShowfollowers(true);
        axios.get('http://localhost:8000/users/followers',{
          headers:{
              'x-access-token':token
          }
      }).then((response)=>{
        setfollowerslist(response.data)
      })
    }

    const update = () => {
      axios.put('http://localhost:8000/users/updatedetails',{
        place:newplace.current.value,
        dp:image,
        bio:newbio.current.value
      },{
        headers:{
            'x-access-token':token
        }
    }).then((response)=>{
      window.location.reload()
    })
  }

    const followersscroll = followerslist?.map((item,key)=>{
        return <>
        <div key={key} className="row m-2" onClick={()=>navigate(`/user/${item.follower}`)}>
            <div className="col-2">
            <img className='dp rounded-circle' src={item.dp}></img>
            </div>
            <div className="col-10 d-flex align-items-center">
            <h6>{item.follower}</h6>
            </div>
        </div>
        </>
    })

    const followingsscroll = followinglist?.map((item,key)=>{
        return <>
        <div key={key} className="row m-2" onClick={()=>navigate(`/user/${item.username}`)}>
            <div className="col-2">
            <img className='dp rounded-circle d-flex align-items-center' src={item.dp}></img>
            </div>
            <div className="col-10 d-flex align-items-center">
            <h6>{item.username}</h6>
            </div>
        </div>
        </>
    })

    const [showfollowings, setShowfollowings] = useState(false);
    const handleClosefollowings = () => setShowfollowings(false);

    const handleShowfollowings = () => {
        setShowfollowings(true);
        axios.get('http://localhost:8000/users/followings',{
          headers:{
              'x-access-token':token
          }
      }).then((response)=>{
        setfollowinglist(response.data)
      })
    }

    const ondelete = ()=>{
        axios.post('http://localhost:8000/auth/delete',{},{
          headers:{
              'x-access-token':token
          }
      }).then((response)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        context.setuser({username:'',dp:''})
        // navigate('/login')
        window.location.reload();
      })



    }
    return <>

      <Modal show={showfollowers} onHide={handleClosefollowers}>
        <Modal.Header className="secondary" closeButton>
          <Modal.Title >followers</Modal.Title>
        </Modal.Header>
        <Modal.Body className='background fixedbox'>{followersscroll}</Modal.Body>
      </Modal>

      <Modal show={showfollowings} onHide={handleClosefollowings}>
        <Modal.Header className="secondary" closeButton>
          <Modal.Title >following</Modal.Title>
        </Modal.Header>
        <Modal.Body className='background fixedbox'>{followingsscroll}</Modal.Body>
      </Modal>


    <div className='card p-4 m-5 col-md-8 secondary'>
        {!edit?
        (<div className='container'>
            <div className='row justify-content-center'>
                <div className='col-4 d-flex align-items-center'>
                    <img className='profilepic rounded-circle' src={dp}></img>
                </div>
                <div className='col-sm-5'>
                    <h5>{username}</h5>
                    <h6>{place}</h6>
                    <a onClick={handleShowfollowers}>Followers: <h6 className='sameline'>{followers}</h6></a>&emsp;<a onClick={handleShowfollowings}>Following: <h6 className='sameline'>{following}</h6></a>
                    <p>{bio}</p>
                    <button className='btn col-4 btn-outline-secondary' onClick={()=>setedit(true)}>edit</button>
                </div>
                
            </div>
        </div>)
        :
        (<div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-4  d-flex align-items-center'>
                    {/* <img className='profilepic rounded-circle' src={dp}></img> */}
                    <div className="row">
                      <div className="col-12">
                    <div className="image-upload ">
  <label htmlFor="file-input">
                    <img className='profilepic rounded-circle' src={image?image:dp}></img>
                    </label>

  <input id="file-input" type="file" 

         
          onChange={uploadImage}
               />                 
                 </div>
                 </div>
                 <h6 className="col-12 mt-3">change image</h6>
                 </div>
                </div>

                <div className='col-sm-5'>
                    <h5>{username}</h5>
                    <div className='row'>
                        <div className='col-4'>                    
                        <h6 className='sameline'>Place</h6>
                        </div>
                        <div className='col-8'>
                        <input ref={newplace} type='text' className='form-control'></input>
                        </div>
                        
                    </div>
                    <br/>
                    <div className='form-group'>
                    <div className='row'>
                        <div className='col-4'>                    
                        <h6 className='sameline'>Bio</h6>
                        </div>
                        <div className='col-8'>
                        <textarea rows='4' type='text' ref={newbio} className='form-control'></textarea>
                        </div>
                    </div>
                    </div>
                    <br/>
                    <div><button className='btn col-4 btn-outline-success' onClick={update}>Save</button>&emsp;
                        <button onClick={()=>setedit(false)} className='btn col-4 btn-outline-danger'>Cancel</button> </div>
                        <br/><a onClick={ondelete}>delete account</a>
                </div>
            </div>
        </div>)}
    </div>
    </>
}