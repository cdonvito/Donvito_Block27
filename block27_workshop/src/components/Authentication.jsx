import { useState } from "react";

function Authentication(props) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");

  const api = "https://fsa-jwt-practice.herokuapp.com/authenticate";

  async function handleClick() {
    //console.log("clicked");
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      });

      const json = await response.json();
      setSuccessMessage(json.message);
      setUsername(json.data.username);

      setError(null);

      // console.log("Authentication", json);
      // console.log("Success Message: ", json.message);
      // console.log("Username: ", json.data.username);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      {error ? <p className="Error_Message">{error}</p> : ""}
      {successMessage && !error ? (
        <p className="Success_Message">{successMessage}</p>
      ) : (
        ""
      )}
      {successMessage && !error ? (
        <p className="Success_Message">{`Username: ${username}`}</p>
      ) : (
        ""
      )}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}

export default Authentication;
