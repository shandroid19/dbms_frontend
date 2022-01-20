import Post from "./Post"
export default function Feed({list})
{
    // const default_list = [{username:'shan',dp:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALZAcoGIUr4WMJpsN3PqonWdIMd1oGXpbow&usqp=CAU",
    // img:"https://recenthighlights.com/wp-content/uploads/2020/11/One-Piece-995.jpg",
    // caption:"zoro n luffy",likes:3450}]

    // list = list?list:default_list

    const posts = list?.map((item,key)=>{return (<div className='row d-flex justify-content-center'><Post key={key} username={item.username} dp={item.dp} img={item.img}
     caption={item.caption} likes={item.likes}/></div>)})
    return (
        <>
        {list?posts:<div className='row m-5 d-flex justify-content-center'><div className='col-2 m-5'><div class="spinner-border text-primary" role="status">
  <span class="sr-only"></span></div></div></div>}
        </>
    )
}