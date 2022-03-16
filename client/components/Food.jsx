import React, { useState, useEffect } from 'react';
//import staticFishy from './../../assets/staticFishy.png';
import byeFish from './../../assets/byeFish.png';
import axios from 'axios';

const fishStyle = {
  transition: 'all 2s ease-out',
};

const Food = ({ feedToggle, setFeedToggle, useInterval, addHeart }) => {
  const [foodStyle, setFoodStyle] = useState({ left: '0px', scale: 1 });
  const [eatingFish, setEatingFish] = useState(false);
  //const [picChoice, setPicChoice] = useState(byeFish);

  useEffect(() => {
    setFoodStyle({ left: '380px', scale: 1 });
    setTimeout(() => {
      setEatingFish(true);
    }, 1000);
    setTimeout(() => {
      setFeedToggle(false);
      addHeart();
    }, 2000);
  }, [feedToggle]);

  //useInterval(() => {
  //  setFoodStyle({
  //    left: '400px',
  //    scale: 1,
  //    animation: 'moveSpritesheet 1s steps(4) infinite',
  //  });
  //}, 1000);
  //

  return (
    <div
      style={{
        ...fishStyle,
        left: foodStyle.left,
        transform: `scale(${foodStyle.scale})`,
      }}
      className='fishContainer'
    >
      {eatingFish ? (
        <img id='movingFishPic' src={byeFish}></img>
      ) : (
        <img id='fishPic' src={byeFish}></img>
      )}
    </div>
  );
};

export default Food;
