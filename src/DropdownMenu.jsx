import React, { useRef, useState } from 'react';
import DropdownMenuItem from './DropdownMenuItem';

const DropdownMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => {
    setIsActive(!isActive);
  }

  return (
    <div className="difficulty-container">
      <button onClick={onClick} className="menu-trigger">
        <span>DIFFICULTY</span>
      </button>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <DropdownMenuItem item="ALL" />
        <DropdownMenuItem item="-" />
        <DropdownMenuItem item="- -" />
        <DropdownMenuItem item="- - -" />
      </nav>
    </div>
  );
};

export default DropdownMenu;