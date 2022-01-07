import Post from "./Post"
export default function Feed()
{
    const list = [{username:'shan',dp:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALZAcoGIUr4WMJpsN3PqonWdIMd1oGXpbow&usqp=CAU",
    img:"https://recenthighlights.com/wp-content/uploads/2020/11/One-Piece-995.jpg",
    caption:"zoro n luffy",likes:3450}]

    const posts = list.map((item)=>{return (<Post username={item.username} dp={item.dp} img={item.img}
     caption={item.caption} likes={item.likes}/>)})
    return (
        <>
        {posts}
        </>
    )
}