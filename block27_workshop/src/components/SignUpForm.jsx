import { useState } from "react";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const api = "https://fsa-jwt-practice.herokuapp.com/signup";

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const json = await response.json();
      console.log("Sign Up", json);

      props.setToken(json.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error ? <p>{error.message}</p> : ""}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="Username"
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default SignUpForm;
