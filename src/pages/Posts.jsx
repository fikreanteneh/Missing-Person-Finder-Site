
import { useAuth } from "../context/AuthContext"
import { storage, db } from "../config/firebase"
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore"
import { useState, useEffect } from "react"

export const Posts = () => {

    const { currentUser } = useAuth()

    let pageSize = 10;
    const docRef = collection(db, "posts")
    const qwery = query(docRef, orderBy("createdAt"), limit(pageSize))


    const [currentData, setCurrentData] = useState([])
    useEffect(() => {
        first()
    }, [])

    const first = async () => {
        if (currentUser) {
            let curr = await getDocs(qwery)
            console.log("--", curr.data())
            setCurrentData(curr)
            console.log(currentData)
        }
    }


    const pagenate = async () => {
    }




    return (
        <div>posts
            {/* {
                currentUser && (

                )
            } */}
        </div>
    )
}
