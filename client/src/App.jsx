
import { auth, googleProvider } from './firebase'
import {signInWithPopup} from 'firebase/auth'
import { login } from './features/login'

function App() {

 
  const handleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider)
  const token = await result.user.getIdToken()
  const data = await login(token)
    console.log(data)
  }



  return (
    <>
    <button onClick={handleLogin}>Continue with Google</button>
    </>
  )
}

export default App
