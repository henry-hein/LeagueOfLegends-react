import React from 'react';

const DropdownMenuItem = (props) => {
  return (
    <ul>
      <li>
        <a>{props.item}</a>
      </li>
    </ul>
  );
};



export default DropdownMenuItem;