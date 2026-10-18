
import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from './pages/SignUp.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { me } from './features/me.js'
import { setUserData } from './redux/userSlice.js'
import HomePage from './pages/HomePage.jsx'

function App() {
  const dispatch = useDispatch()
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await me()
        dispatch(setUserData(data))
      } finally {
        setIsAuthLoading(false)
      }
    }

    fetchCurrentUser()
  }, [dispatch])



  return (
    <>
<BrowserRouter>
  <Routes>
    <Route >
      <Route path='/signup' element={<SignUp isAuthLoading={isAuthLoading} />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/privacy' element={<div>Privacy Policy</div>} />
    </Route>
  </Routes>
</BrowserRouter>
    </>
  )     
}
  export default App