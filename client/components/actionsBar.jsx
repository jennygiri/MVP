import React, { useState, useEffect } from 'react';

const ActionsBar = () => {
  const [feedToggle, setFeedToggle] = useState(false);
  return (
    <div className='actionsBar'>
      <button
        id='feedbtn'
        onClick={() => {
          setFeedToggle(!feedToggle);
        }}
      >
        Feed
      </button>
      <button id='playbtn'>Play</button>
      <button id='sleepbtn'>Sleep</button>
    </div>
  );
};

export default ActionsBar;
