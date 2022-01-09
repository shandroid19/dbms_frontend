import Feed from "./Feed"
export default function Home(props) {
  const default_list = [{username:'ur at home silly',dp:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALZAcoGIUr4WMJpsN3PqonWdIMd1oGXpbow&usqp=CAU",
  img:"https://recenthighlights.com/wp-content/uploads/2020/11/One-Piece-995.jpg",
  caption:"zoro n luffy",likes:3450}]
     return <div className='row d-flex justify-content-center'>
       
      <Feed list={default_list}/>
      </div>
  }