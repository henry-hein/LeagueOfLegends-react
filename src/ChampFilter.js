import React from 'react';

const ChampFilterMenu = () => {
  return ( 
    <ul className="champ-filter">
      <ChampFilterMenuItem champType="ALL" />
      <ChampFilterMenuItem champType="ASSASSINS" />
      <ChampFilterMenuItem champType="FIGHTERS" />
      <ChampFilterMenuItem champType="MAGES" />
      <ChampFilterMenuItem champType="MARKSMEN" />
      <ChampFilterMenuItem champType="SUPPORT" />
      <ChampFilterMenuItem champType="TANKS" />
    </ul>
  );
};

const ChampFilterMenuItem = (props) => {
  return (
    <li>
      <button>
        {props.champType}
      </button>
    </li>
  );
};



export default ChampFilterMenu;
