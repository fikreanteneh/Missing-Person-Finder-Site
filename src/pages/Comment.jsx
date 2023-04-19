import React from 'react'
import { useLocation } from 'react-router-dom'
import { CommentForm } from './CommentForm'
import { PostCard } from './PostCard'
import { CommentView } from './CommentView'


export const Comment = () => {
  const {state} = useLocation()
  const post = state.post
  return (
      <div >
        <PostCard post = {post}/>

        <CommentView post={post} />

        <CommentForm postID={post.id}/>
            
      </div>
  )
}
