import axios from "axios"
import { useRef, useState } from "react"
import {Form} from 'react-bootstrap'


export default function Addpost(){


    const [loading,setloading] = useState()
    const [image,setImage] = useState()
    const caption = useRef();
    const [isSwitchOn,setIsSwitchOn] = useState(true)
    const [add,setadd]= useState(false)

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
            console.log(response)
        }) 
    }


    const uploadImage = async e=> {
        setloading(true)
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
        setImage(file.secure_url);
        setloading(false)
    }

    return (<div className="card col-6 secondary p-5 m-5">
        {!add?<div className="container">
            <div className="row">
                <div className='col-7'>
            <h4>Add post</h4>
                </div>
                <div className='col-5'>
            <button onClick={()=>setadd(true)} className="btn btn-lg btn-primary">+</button>
                </div>

            </div>

            </div>:<div className="container">
        <div className="row">
        <div className="col-3">
            <p className="card-text">Caption</p>
        </div>
        <div className="col-8">
            <textarea ref={caption} className="form-control" rows={3}></textarea>
        </div>
        </div>
        {loading?<div className="row d-flex justify-content-center"><div className='col-2'>
        <div class="spinner-border text-primary" role="status">
  <span class="sr-only"></span>
</div>
            </div></div>:<div className="row d-flex justify-content-center m-3">
        <div className="col-10">
            <img className='postimg' src={image}></img>
        </div>
        </div>
        }
        <div className='row my-2'>
                     <div className='col-6'><label>Upload image :</label></div>
                     <input 
              className = 'btn btn-secondary m-2 col-6'
          type="file"
         
         //  value={selectedFile}            
          onChange={uploadImage}
               />                 
                 </div>

                 <div className="row ">
                    <div className="col-md-3">
                    <p> Private:</p>
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
    </div>}
    </div>)
}