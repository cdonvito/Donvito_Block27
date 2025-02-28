import { useState } from "react";

function Authentication(props) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");

  const api = "https://fsa-jwt-practice.herokuapp.com/authenticate";

  async function handleClick() {
    console.log("clicked");
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      });

      const json = await response.json();
      console.log("Authentication", json);
      setSuccessMessage(json.message);
      setUsername(json.data.username);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      {error ? <p>{error}</p> : ""}
      {successMessage ? <p>{successMessage}</p> : ""}
      {successMessage ? <p>{`Username: ${username}`}</p> : ""}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}

export default Authentication;
