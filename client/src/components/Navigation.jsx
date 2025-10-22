import React, { useState } from 'react';
import '../App.css';
import '../css/Navigation.css';

const Navigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <h1 className="brand-name">Serena's Auréline 💍</h1>
      </div>

      <div className="nav-right">
        <ul>
          <li
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            >
            <a href="#" className="nav-link">Create Jewelry ▾</a>
            <ul className="dropdown-menu">
                <li><a href="/create/bracelet">Bracelet</a></li>
                <li><a href="/create/earrings">Earrings</a></li>
                <li><a href="/create/necklace">Necklace</a></li>
                <li><a href="/create/ring">Ring</a></li>
            </ul>
            </li>
          <li><a href="/create/set" className="nav-link">Add a Jewelry Set</a></li>
          <li><a href="/jewelrysets" className="nav-link">View Jewelry Sets</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
