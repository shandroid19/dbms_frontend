import { useState} from 'react'

export default function Login()
{
    const [status, setstatus,] = useState(2)
    return (
        <div className="card col-4 p-5 m-5 secondary">
            <div className="container">
            <div className="row d-flex justify-content-center mb-3">
                    <h3>Login</h3>

                    </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-10">
                    <input type='text' className="form-control" placeholder="username"/>
                    </div>
                    </div>
                    <div className="row d-flex justify-content-center my-3">
                    <div className="col-10 ">
                    <input type='password' className="form-control" placeholder="password"/>
                    </div>
                    </div>
                    <div className="row d-flex justify-content-center ">
                        <div>
                    {status===1?<p style={{color:'red'}}>invalid username</p>:(
                    status===2?<p style={{color:'red'}}>incorrect password</p>:<></>
                    )}
                    </div>
                    </div>
                    <div className="row d-flex justify-content-center mb-3">
                    <div className="col-6 d-flex justify-content-center">
                    <button className="btn btn-primary">Login</button>
                    </div>
                    </div>
                 
                </div>
            </div>

    )
}