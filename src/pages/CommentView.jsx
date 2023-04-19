import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { ref } from 'firebase/storage'
import { getDocs, limit, orderBy, query, startAfter, collection } from 'firebase/firestore'

export const CommentView = ({post}) => {
    const docRef = collection(db, "post", post.id, "comment")
    const [currComment, setCurrCommet] = useState([])
    const pageSize = 10
    let currLastComment = {}

    useEffect (()=>{
        commentFetch(true)
    }, [])

    // const handle

    const commentFetch = async(first) => {
        
        try{
            const fullQuery = query(docRef, orderBy("createdAt", "desc"), limit(pageSize), startAfter(currLastComment))
            const response = await getDocs(query)
            const curr = []
            response.forEach(comments => {
                curr.push( {...comments.data(), id: comments.id})
            })
            currLastComment = response[response.length - 1]
            if (first){
                setCurrCommet(()=>curr)
            }else{
            setCurrCommet(comments => {
                [...comments, ...curr]
            })}
            console.log(curr, "----")
        }
        catch{
        }
    }



  return (
    <>
    {console.log(currComment)}
    {currComment.forEach(post => {
        <li>{post.comment}</li>
    })}
    </>
  )
}
