export default function Otheruser({username,bio,dp,place,status,followers,following})
{
    return <div className='card p-5 col-8 secondary'>
        <div className='container'>
            <div className='row'>
                <div className='col-2 d-flex align-items-center'>
                    <img className='profilepic rounded-circle' src={dp}></img>
                </div>
                <div className='col-5'>
                    <h5>{username}</h5>
                    <h6>{place}</h6>
                    Followers: <h6 className='sameline'>{followers}</h6>&emsp;Following: <h6 className='sameline'>{following}</h6>
                    <p>{bio}</p>
                    <div className='row'>
                        {status==0?<button className='btn col-4 btn-primary' >Follow</button>:
                        (status==1?<button className='btn col-4 btn-outline-secondary' >Unfollow</button>:
                        (status==2?<div><button className='btn col-4 btn-outline-secondary'>Requested</button></div>:
                        <div><button className='btn col-4 btn-primary'>Accept</button>&emsp;
                        <button className='btn col-4 btn-danger'>Reject</button> </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}