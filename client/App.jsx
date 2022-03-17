import React, { useState, useEffect, useRef } from 'react';
import Character from './components/Character.jsx';
import Stats from './components/Stats.jsx';
import ActionsBar from './components/ActionsBar.jsx';
import axios from 'axios';
import Login from './components/Login.jsx';
import Food from './components/Food.jsx';

const App = (props) => {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [hungerHearts, setHungerHearts] = useState(5);
  const [loggedIn, setLoggedIn] = useState(false);
  const [feedToggle, setFeedToggle] = useState(false);
  const [timesFed, setTimesFed] = useState(0);

  const meow = new Audio('meow.mp3');

  useEffect(() => {
    if (hungerHearts === 0) {
      meow.play();
    }
  }, [hungerHearts]);
  console.log('timesfed', timesFed);

  useEffect(() => {
    if (timesFed >= 5) {
      updateAgeAndWeight();
    }
  }, [timesFed]);

  const updateAgeAndWeight = () => {
    axios
      .get(`/growing/${user}/${timesFed}`)
      .then(() => {
        getStats(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getStats = (user) => {
    axios
      .get(`/stats/${user}`)
      .then((response) => {
        setName(response.data[0].name);
        setWeight(response.data[0].weight);
        setAge(response.data[0].age);
        setHungerHearts(response.data[0].hungerhearts);
        setTimesFed(response.data[0].timesFed);
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

  const addHeart = () => {
    axios
      .get(`/feeding/${user}`)
      .then(() => {
        getStats(user);
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

  const useInterval = (callback, delay) => {
    const savedCB = useRef();
    //current is set to nothing rn
    useEffect(() => {
      savedCB.current = callback;
    }, [callback]);

    useEffect(() => {
      const run = () => {
        savedCB.current();
      };
      if (delay !== null) {
        let id = setInterval(run, delay);
        return () => {
          clearInterval(id);
        };
      }
    }, [delay]);
  };

  const removeHearts = () => {
    axios
      .get(`/heartsRem/${user}`)
      .then(() => {
        getStats(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useInterval(() => {
    if (hungerHearts > 0) {
      removeHearts();
      //setHungerHearts(hungerHearts - 1);
    }
  }, 15000);

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
          {feedToggle ? (
            <Food
              feedToggle={feedToggle}
              setFeedToggle={setFeedToggle}
              useInterval={useInterval}
              addHeart={addHeart}
            />
          ) : null}
        </div>
        <div className='topBar'>
          <ActionsBar feedToggle={feedToggle} setFeedToggle={setFeedToggle} />
          <Stats
            name={name}
            age={age}
            hungerHearts={hungerHearts}
            weight={weight}
          />
        </div>
      </div>
    );
  }
};

export default App;
