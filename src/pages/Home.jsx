import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { useAuth } from "../context/AuthContext"
import { db } from "../config/firebase"
import { collection, query, orderBy, startAfter, limit, getDocs, where, startAt, endAt, endBefore} from "firebase/firestore"
import { CommentForm } from "./CommentForm"
import { PostCard } from "./PostCard"
import '../pages css/Home.css'
// import {paginate} from "../utils/fetchPosts"

export const Home = () => {
// const [startPos, setStartPos] = useState({})
  // const [endPos, setEndPos] = useState({})
  // const [nextButton, setNextButton] = useState(false)
  // const [backButton, setBackButton] = useState(true)

  const { currentUser } = useAuth()

  let pageSize = 10;
  const docRef = collection(db, "posts")
  let startPos = {}
  // let pageData = [{}, {}]
  
  const [currentData, setCurrentData] = useState([])
  
  useEffect(() => {
    paginate(true)
    window.addEventListener( "scroll", handleScroll)
  }, [])

  const handleScroll = (e) => {
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight ) {
      paginate(false)
    }
  }

  const paginate = async (first) => {
    const fullQuery = query(docRef, orderBy("createdAt", "desc"), limit(pageSize), startAfter(startPos))
    let currData = []
    const response = await getDocs(fullQuery)
    startPos = response.docs[response.docs.length - 1]
    response.forEach(async (doc) => {
      currData.push({
        ...doc.data(), 
        id: doc.id, 
      })
    })
    
    if (first){ setCurrentData(() => currData) }
    else {setCurrentData((oldData) => [...oldData, ...currData])}
  }

  // const paginate = async (pos = endAt(0)) => {
  //     const qwery = query(docRef, orderBy("createdAt", "desc"), limit(pageSize), pos )
  //     let currData = []
  //     const curr = await getDocs(qwery)
  //     setStartPos (() => curr.docs )
  //     curr.forEach(async (doc) => {
  //       currData.push({
  //         ...doc.data(), 
  //         id: doc.id, 
  //             })
  //     })
  //     setCurrentData(() => currData)
  //     // setStartPos(() => curr.docs[curr.docs.length - 1] )
  //     return [curr.docs[0], curr.docs[curr.docs.length - 1]]

  //   }

  // const handleNext = async () => {
  //   let x = await paginate(startAfter(startPos))
  //   // console.log("next",x)
  //   setEndPos(startPos)
  //   setStartPos(x[1])
  //   setBackButton(!Boolean(endPos))
  //   setNextButton(!Boolean(startPos))
    
  // } 
  // const handleBack = async () => {
  //   let x = await paginate(startAt(endPos))
  //   // console.log("back", x)
  //   setEndPos(startPos)
  //   console.log(Boolean(endPos), endPos, startPos)
  //   setStartPos(x[1])
  //   setBackButton(!Boolean(endPos))
  //   setBackButton(!Boolean(startPos))
  // }

  const seeComment = () => {
    
  }
  return (
    
    <>
      <div className="post">
        {currentUser && (
          <Link to="post"> + Create Post</Link>
        )}
    </div>

      <div >
        {currentData.map((posts) => (
          <div className="post__container" key={posts.id}>
            <PostCard post = {posts}/>
            <CommentForm postID={posts.id}/>
            <button><Link to={posts.id} state={ {post:posts}}>See Comments</Link></button>
          </div>
        ))}
      </div>
    </>

  )
}
