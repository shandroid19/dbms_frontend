export default function Comment({dp,username,comment}){
return <div>
    <div className='row'>
        <div className='col-1'>
            <img src={dp} className='rounded-circle dp'></img>
        </div>
        <div className='col-11'>
            <h6>{username}</h6>
            <p>{comment}</p>
        </div>
    </div>
</div>
}