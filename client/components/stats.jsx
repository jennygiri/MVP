import React, { useEffect, useState } from 'react';
import statsLabel from '../../assets/statsLabel.png';

const Stats = ({ name, age, weight, hungerHearts, setHungerHearts }) => {
  const [heartsArr, setHeartsArr] = useState(null);
  const makeHeartsArray = (hungerHearts) => {
    let hearts = [];
    for (let i = 0; i < hungerHearts; i++) {
      hearts.push(true);
    }
    while (hearts.length < 5) {
      hearts.push(false);
    }
    return hearts;
  };

  useEffect(() => {
    console.log('hunger hearts:', hungerHearts);
    setHeartsArr(makeHeartsArray(hungerHearts));
  }, [hungerHearts]);

  return (
    <div className='stats'>
      <img src={statsLabel}></img>
      <div id='age'>{age} years old</div>
      <div id='weight'>{weight} oz</div>
      <div id='hungerHearts'>
        hunger meter
        <br></br>
        {heartsArr &&
          heartsArr.map((bool, index) => {
            if (bool) {
              return <i key={index} className='fa-solid fa-heart'></i>;
            } else {
              return <i key={index} className='fa-regular fa-heart'></i>;
            }
          })}
      </div>
    </div>
  );
};

export default Stats;
