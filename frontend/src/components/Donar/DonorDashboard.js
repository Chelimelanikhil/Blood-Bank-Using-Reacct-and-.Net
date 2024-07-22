import React from 'react';
import { Link ,Outlet} from 'react-router-dom';

function DonorDashboard() {
  return (
    <>
    <style>{`
    /* Put this CSS in your main.css file or equivalent */

    .row {
      padding: 5px;
    }
    
    .fa-tint {
      color: red;
    }
    
    .blood {
      float: right;
    }
    
    .fa-users {
      color: blue;
      font-size: 3ex;
    }
    
    .fa-spinner {
      color: blue;
      font-size: 3ex;
    }
    
    .fa-check-circle {
      color: blue;
      font-size: 3ex;
    }
    
    .xyz {
      color: blue;
      font-size: 3ex;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
      text-decoration: none;
      font-family: 'Josefin Sans', sans-serif;
    }
    
    body {
      background-color: #f3f5f9;
    }
    
    .bg-danger {
      background-color: #ff0018!important;
    }
    
    .wrapper {
      display: flex;
      position: relative;
    }
    
    .wrapper .sidebar {
      width: 200px;
      height: 100%;
      background: #343a40;
      padding: 30px 0px;
      position: fixed;
    }
    
    .wrapper .sidebar h2 {
      color: #fff;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .wrapper .sidebar ul li {
      padding: 15px;
      border-bottom: 1px solid #bdb8d7;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .wrapper .sidebar ul li a {
      color: #bdb8d7;
      display: block;
    }
    
    .wrapper .sidebar ul li a .fas {
      width: 25px;
    }
    
    .wrapper .sidebar ul li:hover {
      background-color: #594f8d;
    }
    
    .wrapper .sidebar ul li:hover a {
      color: #fff;
    }
    
    .wrapper .sidebar .social_media {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
    }
    
    .wrapper .sidebar .social_media a {
      display: block;
      width: 40px;
      background: #594f8d;
      height: 40px;
      line-height: 45px;
      text-align: center;
      margin: 0 5px;
      color: #bdb8d7;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    
    .wrapper .main_content {
      width: 100%;
      margin-left: 200px;
    }
    
    .wrapper .main_content .header {
      padding: 20px;
      background: #fff;
      color: #717171;
      border-bottom: 1px solid #e0e4e8;
    }
    
    .wrapper .main_content .info {
      margin: 20px;
      color: #717171;
      line-height: 25px;
    }
    
    .wrapper .main_content .info div {
      margin-bottom: 20px;
    }
    
    @media (max-height: 500px) {
      .social_media {
        display: none !important;
      }
    }
    
    .fa-sign-out-alt {
      color: white;
      font-size: 2ex;
    }
    
    `
}
</style>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-danger">
        <a style={{ color: 'white' }} className="navbar-brand" href="/">
          <i className="fab fa-gratipay"></i>&nbsp;
          <font face="Comic sans MS" size="4">Blood Bank Management System</font>
        </a>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/logout">
                Logout &nbsp; <i className="fas fa-sign-out-alt"></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br /><br />
      <div className="wrapper">
        <div className="sidebar">
          <ul>
            <li><Link style={{ textDecoration: 'none' }} to="/donardashboard"><i className="fas fa-home"></i>Home</Link></li>
            <li><Link style={{ textDecoration: 'none' }} to="/donardashboard/donate-blood"><i className="fas fa-hand-holding-medical"></i>Donate Blood</Link></li>
            <li><Link style={{ textDecoration: 'none' }} to="/donardashboard/donation-history"><i className="fas fa-history"></i>Donation History</Link></li>
            <li><Link style={{ textDecoration: 'none' }} to="/donardashboard/make-request"><i className="fas fa-sync-alt"></i>Blood Request</Link></li>
            <li><Link style={{ textDecoration: 'none' }} to="/donardashboard/request-history"><i className="fas fa-history"></i>Request History</Link></li>
          </ul>
        </div>
        <div className="main_content" >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DonorDashboard;
