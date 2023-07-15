import React, { useState } from 'react'

import LoginScreen from '../screen/LoginScreen'
import RegisterScreen from '../screen/RegisterScreen'

const MainStack = () => {
  const [registerUser, setRegisterUser] = useState(false)
  return (
    registerUser
      ? <RegisterScreen setRegisterUser={setRegisterUser} />
      : <LoginScreen setRegisterUser={setRegisterUser} />
  )
}

export default MainStack
