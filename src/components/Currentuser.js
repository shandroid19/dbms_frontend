import { useState } from "react"
export default function Current({username,bio,dp,place,followers,following})
{
    const [edit,setedit] = useState(true)
    return <div className='card p-5 col-8 secondary'>
        {!edit?
        (<div className='container'>
            <div className='row'>
                <div className='col-2 d-flex align-items-center'>
                    <img className='profilepic rounded-circle' src={dp}></img>
                </div>
                <div className='col-5'>
                    <h5>{username}</h5>
                    <h6>{place}</h6>
                    Followers: <h6 className='sameline'>{followers}</h6>&emsp;Following: <h6 className='sameline'>{following}</h6>
                    <p>{bio}</p>
                    <button className='btn col-4 btn-outline-secondary' onClick={()=>setedit(true)}>edit</button>
                </div>
                
            </div>
        </div>)
        :
        (<div className='container'>
            <div className='row'>
                <div className='col-2 d-flex align-items-center'>
                    <img className='profilepic rounded-circle' src={dp}></img>
                </div>
                <div className='col-5'>
                    <h5>{username}</h5>
                    <div className='row'>
                        <div className='col-4'>                    
                        <h6 className='sameline'>place:</h6>
                        </div>
                        <div className='col-8'>
                        <input type='text' className='form-control'></input>
                        </div>
                        
                    </div>
                    <br/>
                    <div className='form-group'>
                    <div className='row'>
                        <div className='col-4'>                    
                        <h6 className='sameline'>bio:</h6>
                        </div>
                        <div className='col-8'>
                        <textarea rows='4' type='text' className='form-control'></textarea>
                        </div>
                    </div>
                    </div>
                    <br/>
                    <div><button className='btn col-4 btn-outline-success'>Save</button>&emsp;
                        <button onClick={()=>setedit(false)} className='btn col-4 btn-outline-danger'>Cancel</button> </div>
                        <br/><a href='#'>delete account</a>
                </div>
            </div>
        </div>)}
    </div>
}