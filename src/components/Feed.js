import { useEffect,useState } from "react"
import Post from "./Post"
export default function Feed({list})
{


    const loader = <div className='row m-5 d-flex justify-content-center'><div className='col-2 m-5'><div className="spinner-border text-primary" role="status">
  <span className="sr-only"></span></div></div></div>


    const card =
            <div className='row m-5 d-flex justify-content-center'>
            <div className='col-sm-6 m-5'>
                <div className="card secondary">
                    <div className="card-body" style={{textAlign:'center'}}>
                        <h5>Nothing to see here :(</h5>
                    </div>
                </div>
                </div></div>
    

    const [loading,setloading] = useState(true)
    const alternative = loading?loader:card
    useEffect(()=>{
        if(list?.length===0)
        {
            setTimeout(()=>{setloading(false);},3000)
        }
    })
    const posts = list?.map((item)=>{ return (<div key={item.postid} className='row d-flex justify-content-center'><Post  single={false} postid={item.postid} username={item.username} created_at={item.created_at} dp={item.dp} img={item.img}
     caption={item.caption}/></div>)})
    return (
        <>
            
            <div className="row flex-end d-flex justify-content-center">
        <div className="col-sm-12 ">{list?.length?posts:alternative}</div>
        
            </div>
        </>
    )
}