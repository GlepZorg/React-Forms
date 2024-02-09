import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

function App() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] =useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  async function handleSubmit(event){
    event.preventDefault();

    if(username.length < 8){
      setUsernameError("Username must be at least 8 characters long");
      return;
    }
    if(password.length < 8){
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setUsernameError("");
    setPasswordError("");

    try{
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });

      if(!response){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setToken(result.token);
      console.log(result);

    } catch(e){
      setError(e.message);
    }
  }
  return (
    <>
      <SignUpForm token={token} setToken={setToken}/>
      <form onSubmit={handleSubmit}>
        <label >
          Username: 
          <input value={username} onChange={(e) => setUsername(e.target.value)} type='text'/>
        </label>
        {usernameError && <p className="error">{usernameError}</p>}
        <label >
          Password: 
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        {passwordError && <p className="error">{passwordError}</p>}
        <button >Submit</button>
      </form>
      <Authenticate token = {token} setToken={setToken}/>

    </>
  )
}

export default App
