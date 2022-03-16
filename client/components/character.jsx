import React from 'react';
import bouncyadult from '../../assets/bouncyadult.png';

const Character = ({ name }) => {
  return (
    <div className='mainCharacter'>
      <img className='spriteSheet' src={bouncyadult} />
    </div>
  );
};

export default Character;
