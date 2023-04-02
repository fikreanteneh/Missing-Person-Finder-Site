import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { useAuth } from "../context/AuthContext"
import { db } from "../config/firebase"
import { collection, query, orderBy, startAfter, limit, getDocs, where, startAt, endAt, endBefore} from "firebase/firestore"

export const Home = () => {

  const { currentUser } = useAuth()

  let pageSize = 2;
  const docRef = collection(db, "posts")
  const [startPos, setStartPos] = useState({})
  const [endPos, setEndPos] = useState({})
  const [nextButton, setNextButton] = useState(false)
  const [backButton, setBackButton] = useState(true)
  

  const [currentData, setCurrentData] = useState([])
  useEffect(() => {
    handleBack()
  }, [])

  const paginate = async (pos = endAt(0)) => {
      const qwery = query(docRef, orderBy("createdAt", "desc"), limit(pageSize), pos )
      let currData = []
      const curr = await getDocs(qwery)
      setStartPos (() => curr.docs )
      curr.forEach(async (doc) => {
        currData.push({
          ...doc.data(), 
          id: doc.id, 
              })
      })
      setCurrentData(() => currData)
      // setStartPos(() => curr.docs[curr.docs.length - 1] )
      return [curr.docs[0], curr.docs[curr.docs.length - 1]]

    }

  const handleNext = async () => {
    let x = await paginate(startAfter(startPos))
    console.log("next",x)
    setEndPos(startPos)
    setStartPos(x[1])
    setBackButton(!Boolean(endPos))
    setNextButton(!Boolean(startPos))
    
  } 
  const handleBack = async () => {
    let x = await paginate(startAt(endPos))
    console.log("back", x)
    setEndPos(startPos)
    setStartPos(x[1])
    setBackButton(!Boolean(endPos))
    setBackButton(!Boolean(startPos))
  }

  return (
    <div>
      <div>
        {currentUser && (
          <Link to="post"> + Create Post</Link>
        )}
      </div>
      <div>
        {currentData.map((posts) => (
          <div>
            <img src={posts.photoURL} alt="Missing person" width={40}></img>
            <h5>Name: <span>{posts.fullName}</span></h5>
            <h5>Description: <span>{posts.description}</span></h5>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleBack} disabled={backButton}>Back</button>
        <button onClick={handleNext} disabled={nextButton}>Next</button>
      </div>
  
    </div>

  )
}
