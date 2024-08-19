import React from 'react'

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>
          Email:
          <input type="email" />
          </label>
          <label>
            Password:
            <input type="password" />
          </label>
          <label>
            Confirm Password:
            <input type="password" />
          </label>
          <button type="submit">Sign Up</button>
          
      </form>
      
    </div>
  )
}

export default SignUp
