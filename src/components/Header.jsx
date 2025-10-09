import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-container">
          <a href="/" className="logo">NoEat</a>
          <nav className="nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;