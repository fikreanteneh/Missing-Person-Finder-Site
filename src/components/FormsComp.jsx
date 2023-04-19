import React from 'react'

export const FormsComp = () => {
  return (
    <>
    <div>
        <label>E - mail:</label>
        <br></br>
        <input required type='text' id='email' name='email' placeholder='E - Mail' ref={emailRef}></input>
    </div>
                <div>
                    <label>Password:</label>
                    <br></br>
                    <input required type='password' id='password' name='password' placeholder='Password' ref={passwordRef}></input>
                </div>
                </>
  )
}
