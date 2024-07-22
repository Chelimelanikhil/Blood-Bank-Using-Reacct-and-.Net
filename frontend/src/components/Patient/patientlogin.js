// import React from 'react';

// function PatientLoginForm() {
//   return (
//     <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
//       <div className="wrapper wrapper--w790">
//         <div className="card card-5">
//           <div className="card-heading">
//             <h2 className="title">Patient Login</h2>
//           </div>
//           <div className="card-body">
//             <form method="POST">
//               {/* Your form fields here */}
//               <div>
//                 <button className="btn btn--radius-2 btn-danger" type="submit">Login</button>
//               </div>
//             </form>
//             <br />
//             <p style={{ textAlign: 'center' }}>Does not have an account ? <a style={{ textDecoration: 'none' }} href="/patient/patientsignup">Click here to register</a></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PatientLoginForm;


// import React, { useState } from 'react';
// import Navbar from '../Layout/Navbar';
// import '../main/main.css';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../Layout/Footer';

// function PatientLoginForm() {
//   // State variables for form fields
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here you can handle form submission, e.g., send data to server
//     console.log('Form submitted:', { username, password });

//     // Navigate to the patient dashboard
//     navigate('/patient/patientdashboard');
//   };

//   return (
//    <>
//    <Navbar />
//     <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
         
//       <div className="wrapper wrapper--w790">
//         <div className="card card-5">
//           <div className="card-heading">
//             <h2 className="title">Patient Login</h2>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="form-control"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button className="btn btn--radius-2 btn-danger" type="submit">Login</button>
//             </form>
//             <br />
//             <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/patient/patientsignup">Click here to register</Link></p>

//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// }

// export default PatientLoginForm;







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';
import { Link } from 'react-router-dom';

const PatientLoginForm = ({ onPatientLogin }) => {
  const [user, setUser] = useState({
    id: 1,
    username: '',
    password: '',
    user_type: 'Patient', // Assuming the default user type is 'Patient'
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to your backend to verify the user's credentials and role
      const response = await fetch('https://localhost:7131/api/Users/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (data && data.User) {

        const isPatient = data.User.user_Type === 'Patient';

        if (isPatient) {
          // Call the onAdminLogin function passed as a prop from the App component
          const patientId = data.User.Id;
          onPatientLogin(patientId);
          // Redirect the patient to the patient dashboard or perform any other action
          navigate('/patient/patientdashboard');
        } else {
          alert('User is not an patient');
        }
       
      } else {
        // If user is not authenticated, throw an error
        alert('Invalid username or password');
      }
    } catch (error) {
      // Display an alert for invalid credentials
      alert('Invalid username or password');
    }
  
    // Clear the username and password fields after submission
    setUser({ username: '', password: '', user_type: 'Patient', id: 1 });
  };

 
  return (
    <>
    <Navbar />
      <div className="login-container" style={{marginTop:'150px', marginBottom:'150px'}}>
        <h2>Patient Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/patient/patientsignup">Click here to register</Link></p>
      </div>

      {/* Internal CSS */}
      <style>
        {`
          .login-container {
            max-width: 400px;
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

          .login-container form {
            display: flex;
            flex-direction: column;
          }

          .login-container input {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .login-container button {
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

export default PatientLoginForm;