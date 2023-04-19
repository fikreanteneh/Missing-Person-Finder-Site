import React from 'react'
import "../pages css/PostCard.css"

export const PostCard = ({post}) => {
  return (
    <div className='post__card'>
        <img className="post__image" src={post.photoURL} alt="Missing person" width={40}></img>
        <h1 className='post__name'><span>{post.fullName}</span></h1>
        <h1 className='post__description'><span>{post.description}</span></h1>
    </div>
  )
}
