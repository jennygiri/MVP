import React, { useState, useEffect } from 'react';

const ActionsBar = () => {
  const [feedToggle, setFeedToggle] = useState(false);
  return (
    <div className='actionsBar'>
      <button
        onClick={() => {
          setFeedToggle(!feedToggle);
        }}
      >
        Feed
      </button>
    </div>
  );
};

export default ActionsBar;
