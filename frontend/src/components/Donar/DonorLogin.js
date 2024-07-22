// import React, { useState } from 'react';
// import Footer from '../Layout/Footer';
// import Navbar from '../Layout/Navbar';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// function DonorLogin() {
//     const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData); // You can handle form submission logic here
//     navigate('/donardashboard');
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
//       <div className="wrapper wrapper--w790">
//         <br/><br/><br/>
//         <div className="card card-5">
//           <div className="card-heading">
//             <h2 className="title">Donor Login</h2>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <input type="hidden" name="csrfmiddlewaretoken" /> {/* CSRF token */}
//               <div className="form-row">
//                 <div className="name">Username</div>
//                 <div className="value">
//                   <div className="input-group">
//                     <input type="text" name="username" value={formData.username} onChange={handleChange} className="input--style-5" />
//                   </div>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="name">Password</div>
//                 <div className="value">
//                   <div className="input-group">
//                     <input type="password" name="password" value={formData.password} onChange={handleChange} className="input--style-5" />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <button className="btn btn--radius-2 btn-danger" type="submit">Login</button>
//               </div>
//             </form>
//             <br />
//             <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/donor/donarsignup">Click here to register</Link></p>

           
//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// }

// export default DonorLogin;








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';
import { Link } from 'react-router-dom';

const DonorLogin = ({ onDonarLogin }) => {
  const [user, setUser] = useState({
    id: 1,
    username: '',
    password: '',
    user_type: 'donor', // Assuming the default user type is 'Admin'
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
  

      const isDonor = data.User.user_Type === 'Donor';

        if (isDonor) {
          // Call the onAdminLogin function passed as a prop from the App component
          const donarId = data.User.Id;
          onDonarLogin(donarId);
          // Redirect the patient to the patient dashboard or perform any other action
          navigate('/donardashboard');
        } else {
          alert('User is not an Donor');
        }
      
    } catch (error) {
      // Display an alert for invalid credentials
      alert('Invalid username or password');
    }
  
    // Clear the username and password fields after submission
    setUser({ username: '', password: '', user_type: 'donor', id: 1 });
  };
  return (
    
    <>
  <Navbar />
      <div className="login-container" style={{marginTop:'150px', marginBottom:'150px'}}>
        <h2>Donor Login</h2>
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
        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to="/donor/donarsignup">Click here to register</Link></p>

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
    
    export default DonorLogin;