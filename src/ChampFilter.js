import React from 'react';


const ChampFilterMenuItem = (props) => {
    const passChampRole = (event) => {
      props.getChampRole(event.target.value);
    }

  return (
    <li>
      <button value={props.champType} onClick={passChampRole}>
        {props.champType}
      </button>
    </li>
  );
};


export default ChampFilterMenuItem;
