import { useState } from "react";

export default function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [usernameData, setUsernameData]= useState(null);

    async function handleClick(){
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${token}`,
                },
            });
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setSuccessMessage(result.message);
            setUsernameData(result.data.username);

        } catch(e){
            setError(e.message);
        }
    }


    return (
    <>
    <h2>Authenticate!</h2>
    {successMessage && <p>{successMessage}</p>}
    {error && <p>{error}</p>}
    {usernameData && <p>Logged in as: {usernameData}</p>}
    <button onClick={handleClick}>Authenticate Token</button>
    </>
    );
}