import React from 'react'
import { Login } from '../../styles/Loginstyles'

const LoginLayault = ({ children }) => {
  return (
    <Login>
      <div>{children}</div>
    </Login>
  )
}

export default LoginLayault