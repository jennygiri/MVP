import React, { useState } from 'react';

const Login = ({ user, setUser, name, setName }) => {
  const [tempUser, setTempUser] = useState('');
  const [tempName, setTempName] = useState('');
  return (
    <div id='loginForm'>
      <div id='formItself'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUser(tempUser);
          }}
        >
          <input
            type='text'
            placeholder='username'
            onChange={() => setTempUser(event.target.value)}
          ></input>
          <button>Login</button>
        </form>
        <div>
          Haven't used Kittygotchi yet? Type in your new username below!
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUser(tempUser);
            setName(tempName);
          }}
        >
          <input
            type='text'
            placeholder='username'
            onChange={() => setTempUser(event.target.value)}
          ></input>
          <input
            type='text'
            placeholder="new pet's name!"
            onChange={() => setTempName(event.target.value)}
          ></input>
          <button>Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
