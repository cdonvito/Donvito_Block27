import Authentication from './components/Authentication';
import SignUpForm from './components/SignUpForm';
import './App.css';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <SignUpForm setToken={setToken}/>
      <Authentication token={token}/>
    </>
  )
}

export default App
