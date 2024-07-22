import React from 'react';

function Footer() {
  return (
    <div className="footer bg-primary text-white text-center py-2" style={{ position: 'fixed', bottom: 0, width: '100%', height:'60px' }}>
      <p>Blood Bank Management System <br />
        {/* Made In India &copy; 2021 <br /> */}
        <span role="img" aria-label="Love">Made with ❤️ - <b>Nikhil</b></span>
      </p>
     
    </div>
  );
}

export default Footer;
