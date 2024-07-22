// import React, { useState } from 'react';
// import Footer from '../Layout/Footer';
// import Navbar from '../Layout/Navbar';


// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//     console.log('Username:', username);
//     console.log('Password:', password);
    
//     setUsername('');
//     setPassword('');
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
//       <div className="wrapper wrapper--w790">
//         <br />
//         <br />
//         <br />
//         <div className="card card-5">
//           <div className="card-heading">
//             <h2 className="title">Admin Login</h2>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <div className="form-row">
//                 <div className="name">Username</div>
//                 <div className="value">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="input--style-5"
//                       value={username}
//                       onChange={handleUsernameChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="name">Password</div>
//                 <div className="value">
//                   <div className="input-group">
//                     <input
//                       type="password"
//                       className="input--style-5"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <button className="btn btn--radius-2 btn-danger" type="submit">
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default AdminLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import Navbar from '../Layout/Navbar';

const AdminLogin = ({ onAdminLogin }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    user_type: 'Admin', // Assuming the default user type is 'Admin'
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

      // Check if the response is successful
      if (!response.ok) {
        // If response is not ok, throw an error with the appropriate message
        throw new Error('Invalid username or password');
      }

      // Parse the response data
      const data = await response.json();
      

      // Check if the user is authenticated
      if (data && data.User) {
        // Check if the user is an admin
        const isAdmin = data.User.user_Type === 'Admin';
    

        if (isAdmin) {
          // Call the onAdminLogin function passed as a prop from the App component
          onAdminLogin();
          // Redirect the admin to the admin dashboard or perform any other action
          navigate('/admindashboard');
        } else {
          alert('User is not an admin');
        }
      } else {
        // If user is not authenticated, throw an error
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Display an alert for invalid credentials
      alert('Invalid username or password');
    }

    // Clear the username and password fields after submission
    setUser({
      username: '',
      password: '',
      user_type: 'Admin',
    });
  };

  return (
    
<>
<Navbar />
  <div className="login-container" style={{marginTop:'150px', marginBottom:'150px'}}>
    <h2>Admin Login</h2>
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

export default AdminLogin;