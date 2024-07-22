import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="bs-example">
      <nav style={{ backgroundColor: '#FF0018' }} className="navbar navbar-expand-md navbar-dark fixed-top">
        <Link to="/" className="navbar-brand"><i className="fas fa-heartbeat"></i>&nbsp; Blood Bank Management</Link>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" style={{ color: 'white' }}><i className="fas fa-home"></i>&nbsp; Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/patient/patientlogin" className="nav-link" style={{ color: 'white' }}><i className="fas fa-procedures"></i>&nbsp; Patient</Link>
              </li>
              <li className="nav-item">
                <Link to="/donor/donorlogin" className="nav-link" style={{ color: 'white' }}><i className="fas fa-user"></i>&nbsp; Donor</Link>
              </li>
              <li className="nav-item">
                <Link to="/adminlogin" className="nav-link" style={{ color: 'white' }}><i className="fas fa-user-shield"></i>&nbsp; Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
