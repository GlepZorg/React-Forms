import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event){
    event.preventDefault();
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
      console.log(result);

    } catch(e){
      setError(e.message);
    }
  }
  return (
    <>
      <SignUpForm />
      <form onSubmit={handleSubmit}>
        <label >
          Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label >
          Password: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <button >Submit</button>
      </form>
      <Authenticate />

    </>
  )
}

export default App
