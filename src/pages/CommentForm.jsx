import React, { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import { db } from "../config/firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import "../pages css/form.css"

export const CommentForm = ({postID}) => {

  const { currentUser } = useAuth()
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const docRef = collection(db, "posts", postID ,"comments")
  
  const handleComment = ( e => {
    setComment(()=>e.target.value)
    if (comment) { setLoading(()=> false)}
  })

  const commentSubmit = async () => {
    setLoading(true)
    if (comment && currentUser){
      try{
      const response = await addDoc(docRef, {
        commenter : currentUser.uid,
        comment: comment, 
        createdAt: serverTimestamp()
      })
    }catch{
        setError("Error While Commenting")
      }
    }
    setComment(() => "")
  }


  return (
    <form onSubmit={commentSubmit}>
        <input className='form__input__side' required name='comment' type='text' placeholder='comment' onChange={handleComment}></input>
        <button type='submit' value={comment} disabled={loading}>comment</button>
        <h5 className='form__error'>{error}</h5>
    </form>
  )
}