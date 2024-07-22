// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from '../src/components/Layout/Home'; 
// import PatientLoginForm from './components/Patient/patientlogin';
// import PatientSignupForm from './components/Patient/PatientSignupForm';
// import PatientDashboard from './components/Patient/PatientDashboard';
// import MakeBloodRequest from './components/Patient/MakeBloodRequest';
// import MyBloodRequest from './components/Patient/MyBloodRequest';
// import BloodRequestSummary from './components/Patient/BloodRequestSummary';
// import LogoutPage from './components/Logout/LogoutPage';
// import DonorSignup from './components/Donar/DonorSignup';
// import DonorLogin from './components/Donar/DonorLogin';
// import DonorDashboard from './components/Donar/DonorDashboard';
// import DonorSummary from './components/Donar/DonorSummary';
// import DonateBloodForm from './components/Donar/DonateBloodForm';
// import DonationHistory from './components/Donar/DonationHistory';
// import DonorBloodRequest from './components/Donar/DonorBloodRequest';
// import DonorRequestHistory from './components/Donar/DonorRequestHistory';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import BloodStock from './components/Admin/BloodStock';
// import DonorDetails from './components/Admin/DonorDetails';
// import PatientDetails from './components/Admin/PatientDetails';
// import BloodDonationDetails from './components/Admin/BloodDonationDetails';
// import BloodRequestedList from './components/Admin/BloodRequestedList';
// import BloodRequestHistory from './components/Admin/BloodRequestHistory';
// import BloodStockUpdate from './components/Admin/BloodStockUpdate';
// import AdminLogin from './components/Admin/AdminLogin';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Home />} />




//           <Route path="/patient/patientlogin" element={<PatientLoginForm />} />
//           <Route path="/patient/patientsignup" element={<PatientSignupForm />} />
//           <Route path="/logout" element={<LogoutPage />} />
//           <Route path="/patient/patientdashboard" element={<PatientDashboard />}>
//             <Route index element={<BloodRequestSummary />} />
//             <Route path="make-request" element={<MakeBloodRequest />} />
//             <Route path="my-request" element={<MyBloodRequest />} />
//           </Route>



//           <Route path="/donor/donarsignup" element={<DonorSignup />} />
//           <Route path="/donor/donorlogin" element={<DonorLogin />} />
//           <Route path="/donardashboard" element={<DonorDashboard />}>
//           <Route index element={<DonorSummary />} />
//           <Route path="donate-blood" element={<DonateBloodForm />} />
//           <Route path="donation-history" element={<DonationHistory />} />
//           <Route path="make-request" element={<DonorBloodRequest />} />
//           <Route path="request-history" element={<DonorRequestHistory />} />
//          </Route>


//          <Route path="/adminlogin" element={<AdminLogin />} />
//          <Route path="/admindashboard" element={<AdminDashboard />}>
//           <Route index element={<BloodStock />} />
//           <Route path="admin-donor" element={<DonorDetails />} />
//           <Route path="admin-patient" element={<PatientDetails />} />
//           <Route path="admin-donation" element={<BloodDonationDetails />} />
//           <Route path="admin-request" element={<BloodRequestedList />} />blood
//           <Route path="admin-request-history" element={<BloodRequestHistory />} />
//           <Route path="admin-blood" element={<BloodStockUpdate />} />
//          </Route>

//         </Routes>
//       </div>
//     </Router>
//   );
// }
// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from '../src/components/Layout/Home';
import PatientLoginForm from './components/Patient/patientlogin';
import PatientSignupForm from './components/Patient/PatientSignupForm';
import PatientDashboard from './components/Patient/PatientDashboard';
import MakeBloodRequest from './components/Patient/MakeBloodRequest';
import MyBloodRequest from './components/Patient/MyBloodRequest';
import BloodRequestSummary from './components/Patient/BloodRequestSummary';
import LogoutPage from './components/Logout/LogoutPage';
import DonorSignup from './components/Donar/DonorSignup';
import DonorLogin from './components/Donar/DonorLogin';
import DonorDashboard from './components/Donar/DonorDashboard';
import DonorSummary from './components/Donar/DonorSummary';
import DonateBloodForm from './components/Donar/DonateBloodForm';
import DonationHistory from './components/Donar/DonationHistory';
import DonorBloodRequest from './components/Donar/DonorBloodRequest';
import DonorRequestHistory from './components/Donar/DonorRequestHistory';
import AdminDashboard from './components/Admin/AdminDashboard';
import BloodStock from './components/Admin/BloodStock';
import DonorDetails from './components/Admin/DonorDetails';
import PatientDetails from './components/Admin/PatientDetails';
import BloodDonationDetails from './components/Admin/BloodDonationDetails';
import BloodRequestedList from './components/Admin/BloodRequestedList';
import BloodRequestHistory from './components/Admin/BloodRequestHistory';
import BloodStockUpdate from './components/Admin/BloodStockUpdate';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDonationHistory from './components/Admin/AdminDonationHistroy';



function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isDonor, setIsDonor] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [donorId, setDonorId] = useState(null);

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handlePatientLogin = (id) => {
    setIsPatient(true);
    setPatientId(id);
  };

  const handleDonarLogin = (id) => {
    setIsDonor(true);
    setDonorId(id);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient/patientlogin" element={<PatientLoginForm onPatientLogin={handlePatientLogin} />} />
          <Route path="/patient/patientsignup" element={<PatientSignupForm />} />
          <Route path="/logout" element={<LogoutPage />} />
          {isPatient && (
            <Route path="/patient/patientdashboard" element={<PatientDashboard id="patient-dashboard" patientId={patientId} />}>
              <Route index element={<BloodRequestSummary id="blood-request-summary" patientId={patientId} />} />
              <Route path="make-request" element={<MakeBloodRequest id="make-blood-request" patientId={patientId} />} />
              <Route path="my-request" element={<MyBloodRequest id="my-blood-request" patientId={patientId} />} />
            </Route>
          )}
          <Route path="/donor/donarsignup" element={<DonorSignup />} />
          <Route path="/donor/donorlogin" element={<DonorLogin id="donor-login" onDonarLogin={handleDonarLogin} />} />
          {isDonor && (
            <Route path="/donardashboard" element={<DonorDashboard id="donor-dashboard" donorId={donorId} />}>
              <Route index element={<DonorSummary id="donor-summary" donorId={donorId} />} />
              <Route path="donate-blood" element={<DonateBloodForm id="donate-blood" donorId={donorId} />} />
              <Route path="donation-history" element={<DonationHistory id="donation-history" donorId={donorId} />} />
              <Route path="make-request" element={<DonorBloodRequest id="donor-blood-request" donorId={donorId} />} />
              <Route path="request-history" element={<DonorRequestHistory id="donor-request-history" donorId={donorId} />} />
            </Route>
          )}
          <Route path="/adminlogin" element={<AdminLogin onAdminLogin={handleAdminLogin} />} />
          {isAdmin && (
            <Route path="/admindashboard" element={<AdminDashboard />}>
              <Route index element={<BloodStock />} />
              <Route path="admin-donor" element={<DonorDetails />} />
              <Route path="admin-patient" element={<PatientDetails />} />
              <Route path="admin-donation" element={<BloodDonationDetails />} />
              <Route path="admin-request" element={<BloodRequestedList />} />
              <Route path="admin-request-history" element={<BloodRequestHistory />} />
              <Route path="admin-donation-history" element={<AdminDonationHistory />} />
              <Route path="admin-blood" element={<BloodStockUpdate />} />
            </Route>
          )}
          {isAdmin && <Route path="*" element={<Navigate to="/admindashboard" />} />}
          {isPatient && <Route path="*" element={<Navigate to="/patient/patientdashboard" />} />}
          {isDonor && <Route path="*" element={<Navigate to="/donardashboard" />} />}
          {!isAdmin && !isPatient && !isDonor && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;