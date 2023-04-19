
import { useAuth } from "../context/AuthContext"
import { storage, db } from "../config/firebase"
import { collection, query, orderBy, startAfter, limit, getDocs, where, deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useState, useEffect } from "react"
import { PostView } from "./PostView"

export const Posts = () => {
    const { currentUser } = useAuth()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    let pageSize = 10;
    const docRef = collection(db, "posts")
    let startPos = {}
  
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
      const fullQuery = query(docRef, orderBy("createdAt", "desc"), limit(pageSize), startAfter(startPos), where("poster", "==", "A7i0zQx8lsbGRrQDa2B8nFXhWTj1"))
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

    const handleDelete  = async(id, photo) => {
      setLoading(true)
      setError("")
      try{
        await deleteDoc(doc(db, "posts", id))
        await deleteObject(ref(storage, photo))
      }catch{
        setError("Eroor While Deleting")
      }
      setLoading(false)
      // window.location.reload()
    }



    return (
        <div>posts
            {
                <div >
                {currentData.map((posts) => (
                  <div key={posts.id}>
                    <PostView post={posts}/>
                    <button disabled={loading} onClick={() => {handleDelete(posts.id, posts.photoURL)}}>Delete</button>
                  </div>
                ))}
              </div>
            }
        </div>
    )
}
