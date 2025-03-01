import { useState } from "react";

function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [userError, setUserError] = useState(null);

  const api = "https://fsa-jwt-practice.herokuapp.com/signup";

  async function handleSubmit(event) {
    event.preventDefault();

    if (passError || userError) {
      return;
    }

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
      //console.log("Sign Up", json);

      if (json.success === true) {
        setUsername("");
        setPassword("");
      }

      props.setToken(json.token);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleChange(event) {
    if (event.target.name === "Username") {
      setUsername(event.target.value);

      if (event.target.value.length < 6) {
        setUserError("Username must be at least 6 characters");
        return;
      } else {
        setUserError(null);
      }
    }

    if (event.target.name === "Password") {
      setPassword(event.target.value);

      if (event.target.value.length < 5) {
        setPassError("Password must be at least 5 characters");
        return;
      } else if (
        !event.target.value.includes("?") &&
        !event.target.value.includes("!")
      ) {
        setPassError('Password must include either a "?" or a "!"');
        return;
      } else {
        setPassError(null);
      }
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error ? <p>{error.message}</p> : ""}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          {userError ? <p className="Error_Message">{userError}</p> : ""}
          <input
            value={username}
            name="Username"
            onChange={handleChange}
            placeholder="Username"
          />
        </label>
        <label>
          Password:{" "}
          {passError ? <p className="Error_Message">{passError}</p> : ""}
          <input
            type="Password"
            value={password}
            name="Password"
            onChange={handleChange}
            placeholder="Password"
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default SignUpForm;
