import React, { useState } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import { Link } from 'react-router-dom';

function DonorSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    bloodGroup: '',
    address: '',
    mobile: '',
    profilePic: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      profilePic: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // You can handle form submission logic here
  };
  return (
    <>
      <Navbar />
      <div className="login-container" style={{ marginTop: '70px' , marginBottom:'30px'}}>
        <h2 className="title">Donor Signup</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
            {/* CSRF token */}
            <input type="hidden" name="csrfmiddlewaretoken" />

            {/* Form fields */}
            <div className="form-group">
              <label className="name">First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input--style-5" />
            </div>

            <div className="form-group">
              <label className="name">Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input--style-5" />
            </div>

            <div className="form-group">
              <label className="name">Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="input--style-5" />
            </div>

            <div className="form-group">
              <label className="name">Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="input--style-5" />
            </div>

            <div className="form-group">
              <label className="name">Blood Group:</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input--style-5">
                <option disabled selected>Choose option</option>
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="form-group">
              <label className="name">Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="input--style-5" />
            </div>

            <div className="form-group">
              <label className="name">Mobile:</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="input--style-5" />
            </div>

            <div className="form-group">
              <label className="name">Profile Pic:</label>
              <input type="file" name="profilePic" onChange={handleFileChange} className="input--style-5" />
            </div>

            <button className="btn btn--radius-2 btn-danger" type="submit">Register</button>
          </form>
          <br />
          
          <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/donor/donorlogin">Click here to login</Link></p>
        </div>
      </div>

      <style>
        {`
          .login-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            text-align: center;
          }
    
          .login-container h2 {
            margin-bottom: 20px;
          }
    
          .form-group {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }

          .name {
            width: 150px;
            margin-right: 20px;
          }

          .login-container input,
          .login-container select {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .login-container button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
          }

          .login-container button:hover {
            background-color: #0056b3;
          }

          .login-container p {
            margin-top: 20px;
          }
        `}
      </style>
      <Footer />
    </>
  );
}

export default DonorSignup;