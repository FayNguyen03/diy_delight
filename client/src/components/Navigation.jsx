import React, { useState, useRef } from 'react';
import '../App.css';
import './Navigation.css';

const Navigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 500); 
  };

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <h1 className="brand-name">Serena's Auréline 💍</h1>
      </div>

      <div className="nav-right">
        <ul>
          <li
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#" className="nav-link">Create Jewelry ▾</a>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><a href="/create/bracelet">Bracelet</a></li>
                <li><a href="/create/earrings">Earrings</a></li>
                <li><a href="/create/necklace">Necklace</a></li>
                <li><a href="/create/ring">Ring</a></li>
              </ul>
            )}
          </li>
          <li><a href="/jewelrypieces" className="nav-link">View All Pieces</a></li>
          <li><a href="/" className="nav-link">Create a Jewelry Set</a></li>
          <li><a href="/jewelrysets" className="nav-link">View Jewelry Sets</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
