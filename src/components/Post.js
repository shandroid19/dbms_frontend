export default function Post({username,dp,img,caption,likes})
{
    return <div className="card col-6 p-0 my-5 post">
        <div className="card-header">
            <div className="row">
                <div className="col-1">
                <img className="rounded-circle dp" src={dp}></img>
                </div>
                <div className="col-10 d-flex align-items-center flex-start">
                <h6 className="card-title">{username}</h6>
                </div>  
            </div>
            
        </div>
        <div className="justify-content-center d-flex bg-dark">
            <img className="postimg"  src={img}></img>
        </div>
        <div className="card-body">
            <p className="card-text">likes: <h6 style={{display:"inline"}}>{likes}</h6></p>
            <p className="card-text">{caption}</p>
        </div>
        <div class="accordion" id="accordionExample">
        <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
    </div>
  </div>
  </div>
    </div>
}