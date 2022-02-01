import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
export default function UserFeed({list})
{

    const loader = <div className='row m-5 d-flex justify-content-center'><div className='col-2 m-5'><div className="spinner-border text-primary" role="status">
  <span className="sr-only"></span></div></div></div>
    const navigate = useNavigate()

    const card =
            <div className='row  d-flex justify-content-center py-5'>
            <div className='col-sm-4'>
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


    const posts = (list?.length?list:[]).map((item,key)=>{
   
    return (
        <div key={key}
            data-aos-delay={200*(key%3+1)} data-aos='fade-right'
            className="col-4">
            <div className="card m-3 bg-dark"  onClick={()=>navigate(`/singlepost/${item.postid}`)}>
            <img  src={item.img?item.img:'https://bodybuildingnutritions.com/uploads/images//product/no-image.jpg'}></img>
            </div>
        </div>
     )})


    return (
        <>
            
        {list?.length?posts:alternative}
                </>
    )
}