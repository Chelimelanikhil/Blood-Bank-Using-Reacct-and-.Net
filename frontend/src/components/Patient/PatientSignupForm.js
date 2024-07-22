// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../Layout/Navbar';
// import Footer from '../Layout/Footer';

// function PatientSignupForm() {
//   // State variables for form fields
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [age, setAge] = useState('');
//   const [bloodGroup, setBloodGroup] = useState('');
//   const [disease, setDisease] = useState('');
//   const [doctorName, setDoctorName] = useState('');
//   const [address, setAddress] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [profilePic, setProfilePic] = useState(null);

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here you can handle form submission, e.g., send data to server
//     console.log('Form submitted:', { firstName, lastName, username, password, age, bloodGroup, disease, doctorName, address, mobile, profilePic });
//   };

//   return (
//     <>
//        <Navbar />
//     <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
     
//       <div className="wrapper wrapper--w790">
//         <div className="card card-5">
//           <div className="card-heading">
//             <h2 className="title">Patient Signup</h2>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input type="text" id="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
//               </div>
//               {/* Add other form fields here */}
//               <button className="btn btn--radius-2 btn-danger" type="submit">Register</button>
//             </form>
//             <br />
//             <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/patient/patientlogin">Click here to login</Link></p>

//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// }

// export default PatientSignupForm;



import React, { useState } from 'react';
import Navbar from '../Layout/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../Layout/Footer';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [disease, setDisease] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!username || !password || !email || !fullName || !age || !bloodGroup || !address || !mobile) {
      setError('Please fill in all the required fields.');
      return;
    }

    // Create the user object
    const user = {
      user_Type: 'Patient', // Set user type directly to 'Patient'
      Username: username,
      Password: password,
      Email: email,
      full_name: fullName,
      Age: parseInt(age),
      blood_group: bloodGroup, // Use the selected blood group
      address: address,
      mobile: mobile,
      disease: disease,
      ProfilePic: profilePic,
    };

    try {
      const response = await fetch('https://localhost:7131/api/Users/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to register user: ${errorData.message || 'Unknown error'}`);
      }

      // Reset form fields and error message
      setUsername('');
      setPassword('');
      setEmail('');
      setFullName('');
      setAge('');
      setBloodGroup('');
      setAddress('');
      setMobile('');
      setDisease('');
      setProfilePic('');
      setError('');

      // Optionally, display a success message to the user
      alert('User registered successfully.');
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <>
<Navbar />
<div className="login-container" style={{ marginTop: '70px' , marginBottom:'30px'}}>
        <h2 className="title">Patient Signup</h2>
        <div className="card-body">
      <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">

        <div className="form-group">
        <label className="name">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Full Name:</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Age:</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Blood Group:</label>
          <select
            className="form-control"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            {/* Add more options for other blood groups */}
          </select>
        </div>
        <div className="form-group">
        <label className="name">Address:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Mobile:</label>
          <input
            type="tel"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Disease:</label>
          <input
            type="text"
            className="form-control"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label className="name">Profile Picture:</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Register
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
    <p style={{ textAlign: 'center' }}>Already  have an account? <Link to="/patient/patientlogin">Click here to login</Link></p>
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
};

export default UserRegistration;
