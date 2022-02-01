import axios from "axios"
import { useRef, useState } from "react"
import {Form} from 'react-bootstrap'


export default function Addpost(){


    const [loading,setloading] = useState()
    const [image,setImage] = useState()
    const caption = useRef();
    const [isSwitchOn,setIsSwitchOn] = useState(true)
    const [add,setadd]= useState(false)
    const [uploaded,setuploaded]= useState(false)

    const onSwitchAction = () => {
        setIsSwitchOn(!isSwitchOn);
      };

    const addpost = ()=>{
        const token = localStorage.getItem('token')
        
        const body = {img:image,caption:caption.current.value,private:isSwitchOn}
        axios.post('http://localhost:8000/posts/addpost',body,{
            headers:{
                'x-access-token':token
            }
        }).then((response)=>{
            window.location.reload()
        }) 
    }


    const uploadImage = async e=> {
        setloading(true)
        setuploaded(true)
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset','dbms_mini')
        let filname=files[0].name.toLowerCase();
        if(!(filname.endsWith('.jpg')||filname.endsWith('.png')||filname.endsWith('.jpeg')))
          {
            alert("Only '.png' , '.jpg' and '.jpeg' formats supported!");
            setloading(false)

            return;
          }          
        const res = await fetch("https://api.cloudinary.com/v1_1/shandroid/image/upload",
        {
            method: 'POST',
            body:data
        })
        const file = await res.json()
        const link = file.secure_url
        const cropped = link.slice(0,50)+'b_black,c_pad,h_700,w_700,dpr_auto'+link.slice(49)
        setImage(cropped);
        setloading(false)
    }

    return (
        !add?<div className="card col-md-6 secondary p-5 m-4">
        <div className="container">
            <div className="row">
                <div className='col-7'>
            <h4>Add post</h4>
                </div>
                <div className='col-5'>
            <button onClick={()=>setadd(true)} className="btn btn-lg btn-primary">+</button>
                </div>

            </div>

            </div>
            </div>:<div className="card secondary col-md-6 p-5 m-2">
            <div className="card-header secondary"> <h4> Add post</h4></div>

            <div className="card-body secondary p-5">
        <div className="row">
        <div className="col-md-3">
            <h6 >Caption</h6>
        </div>
        <div className="col-md-8">
            <textarea ref={caption} className="form-control" rows={3}></textarea>
        </div>
        </div>
        {loading?<div className="row d-flex justify-content-center m-5"><div className='col-2'>
        <div className="spinner-border text-primary" role="status">
  <span className="sr-only"></span>
</div>
            </div></div>:(uploaded?<div className="row d-flex justify-content-center m-3">
        <div className="col-md-10">
            <img className='postimg' src={image}></img>
        </div>
        </div>:       <div className='row my-2'>
                     <div className='col-md-12'><label>Upload image </label></div>
            
                     <div className="image-upload col-md-8 mb-2">
  <label htmlFor="file-input">
    <img style={{height:'10rem',width:'10rem'}} src="https://static.thenounproject.com/png/741102-200.png"/>
  </label>

  <input id="file-input" type="file" 

         
         //  value={selectedFile}            
          onChange={uploadImage}
               />                 
                 </div>


                </div>)
        }
                 <div className="row mb-2">
                    <div className="col-md-3">
                    <h6> Private</h6>
                    </div>
                    <div className="col-md-6">
                    <Form.Check 
                    type="switch"
                    id="custom-switch"
                    onChange={onSwitchAction}
                    checked={isSwitchOn}
                    />
</div>
                    </div>
 

        <div className="row">
            <button onClick={addpost} className="btn btn-primary col-3">Upload</button>
            <button onClick={()=>setadd(false)} className="btn btn-danger col-3 mx-3">Cancel</button>

        </div>
        </div>
    
    </div>)
}