import User from "./User";
import Feed from "./Feed";
export default function Profile(){
    return <div> 
        <div className=' row d-flex justify-content-center mt-3 '>
        <User  status={1} followers={1000} following={100} username='shan' bio='my name is shan' place='bangalore' dp='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4jYFXdVooszBgHKsDFCtWruhsIUF9x-iJsw&usqp=CAU'/>
        </div>
        <div className=' row d-flex justify-content-center ' >
        <Feed/>
        </div>
    </div>
}