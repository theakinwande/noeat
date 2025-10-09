import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} NoEat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;