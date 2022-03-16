import React, { useState, useEffect } from 'react';
import Character from './components/Character.jsx';
import Stats from './components/Stats.jsx';
import ActionsBar from './components/ActionsBar.jsx';
import axios from 'axios';
import Login from './components/Login.jsx';

const App = (props) => {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [hungerHearts, setHungerHearts] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const getStats = (user) => {
    axios
      .get(`/stats/${user}`)
      .then((response) => {
        console.log('NAAAAAAME', response.data);
        setName(response.data[0].name);
        setWeight(response.data[0].weight);
        setAge(response.data[0].age);
        setHungerHearts(response.data[0].hungerHearts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addPet = (user, name) => {
    axios
      .post(`/stats/${user}/${name}`)
      .then((response) => {
        getStats(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkIfExists = (user) => {
    axios
      .get(`/users/${user}`)
      .then((response) => {
        console.log(response.data);
        //!they tried to make a new account
        if (response.data === 0 && name.length > 0) {
          addPet(user, name);
          setLoggedIn(true);
          //!they tried to login but their username doesn't exist
        } else if (response.data === 0 && name.length === 0) {
          alert('there is no user with this name, please create an account');
        } else {
          getStats(user);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (user.length > 0) {
      checkIfExists(user);
    }
  }, [user]);

  if (!loggedIn) {
    return (
      <Login user={user} setUser={setUser} name={name} setName={setName} />
    );
  } else {
    return (
      <div className='entireApp'>
        <div id='kittyCorner'>
          <Character name={name} />
          <div id='petName'>{name}</div>
        </div>
        <ActionsBar />
        <Stats name={name} age={age} hungerHearts={3} weight={weight} />
      </div>
    );
  }
};

export default App;
