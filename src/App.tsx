import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Chat } from './components/Chat'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {isLoggedIn ? (
        <Chat />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  )
}

export default App
