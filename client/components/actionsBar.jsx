import React, { useState, useEffect } from 'react';

const ActionsBar = ({ feedToggle, setFeedToggle, isAsleep, setIsAsleep }) => {
  const feed = () => {
    setFeedToggle(true);
    //either set animation to start with fish OR make it draggable
    //once the appropriate amount of time has passed, add 1 heart and add 1 to # of times fed
    //do a get request
    //if no of times fed is x, increase weight/age
  };

  const sleep = () => {
    setIsAsleep(!isAsleep);
  };

  return (
    <div className='actionsBar'>
      <button id='feedbtn' onClick={feed}>
        Feed
      </button>
      <button id='playbtn'>Play</button>
      <button id='sleepbtn' onClick={sleep}>
        Sleep
      </button>
    </div>
  );
};

export default ActionsBar;
