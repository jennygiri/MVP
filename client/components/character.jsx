import React from 'react';
import bouncyadult from '../../assets/bouncyadult.png';
import sleepyadult from '../../assets/sleepy.png';

const Character = ({ name, isAsleep }) => {
  if (isAsleep) {
    return (
      <div className='mainCharacter'>
        <img src={sleepyadult}></img>
      </div>
    );
  } else {
    return (
      <div className='mainCharacter'>
        <img className='spriteSheet' src={bouncyadult} />
      </div>
    );
  }
};

export default Character;
