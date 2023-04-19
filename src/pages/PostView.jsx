import React from 'react'

export const PostView = (prop) => {
  return (
        <div key={prop.id}>
            <img src={prop.photoURL} alt="Missing person" width={40}></img>
            <h1>Name: <span>{prop.fullName}</span></h1>
            <h1>Description: <span>{prop.description}</span></h1>
            <form>
            <input required id='comment' name='comment' type='text' placeholder='comment'></input>
            <button type='submit' on>comment</button>
            </form>
            <button>Comments</button>
        </div>
  )
}
