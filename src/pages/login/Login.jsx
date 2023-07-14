
import { useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react"

const Login = () => {
  const [error,setError]=useState(false)
  const [email,setEmail]=useState("")
  const [passsword,setPassword]=useState("")
  const navigate=useNavigate()
  
  const {dispatch} =useContext(AuthContext)

  const handleLogin=(e)=>{
    e.preventDefault()

signInWithEmailAndPassword(auth, email, passsword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    dispatch({type:"LOGIN",payload:user})
      navigate("/")
  })
  .catch((error) => {
setError(true)
  });
  }
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
       {error && <span>wrong email or password</span>}
      </form>
    </div>
  )
}

export default Login