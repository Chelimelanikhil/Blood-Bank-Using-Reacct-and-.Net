// import React from 'react';

// const BloodRequestHistory = () => {
//   return (
//     <div className="container">
//       <h4 className="text-center">Blood Request History</h4>
//       {/* {message && <h5 className="text-center" style={{ color: 'red' }}>{message}</h5>} */}
//       <table className="table table-light table-hover table-bordered table-striped">
//         <thead className="bg-info">
//           <tr>
//             <th scope="col">Patient Name</th>
//             <th scope="col">Age</th>
//             <th scope="col">Reason</th>
//             <th scope="col">Blood Group</th>
//             <th scope="col">Unit (in ml)</th>
//             <th scope="col">Date</th>
//             <th scope="col">Status</th>
//             <th scope="col">Stock Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {requests.map((request) => (
//             <tr key={request.id}>
//               <td>{request.patient_name}</td>
//               <td>{request.patient_age}</td>
//               <td>{request.reason}</td>
//               <td>{request.bloodgroup}</td>
//               <td>{request.unit}</td>
//               <td>{request.date}</td>
//               <td>
//                 {request.status === 'Approved' ? (
//                   <span className="label warning">Approved</span>
//                 ) : (
//                   <span className="label success">Rejected</span>
//                 )}
//               </td>
//               <td>
//                 <span className="label warning">
//                   {request.status === 'Approved' ? `${request.unit} Unit Deducted From Stock` : `0 Unit Deducted From Stock`}
//                 </span>
//               </td>
//             </tr>
//           ))} */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BloodRequestHistory;


import React, { useState, useEffect } from 'react';

const BloodRequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('https://localhost:7131/api/Admin/GetAllRequests');
        if (!response.ok) {
          throw new Error('Failed to fetch blood requests');
        }
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data.AllData)) {
          setRequests(data.AllData);
        } else {
          setMessage('No blood requests found');
        }
      } catch (error) {
        console.error('Error:', error.message);
        setMessage('Failed to fetch blood requests');
      }
    };

    fetchRequests();
  }, []);

  return (

    <>
      
   <style>
    {`
      .label {
        color: white;
        padding: 8px;
      }
      
      .success {background-color: #4CAF50;} /* Green */
      .info {background-color: #2196F3;} /* Blue */
      .warning {background-color: #ff9800;} /* Orange */
      .danger {background-color: #f44336;} /* Red */
      .other {background-color: #e7e7e7; color: black;} /* Gray */
    
    `}
   </style>
    <div className="container mt-5">
      <h4 className="text-center">Blood Request History</h4>
      {/* {message && <h5 className="text-center" style={{ color: 'red' }}>{message}</h5>} */}
      <table className="table table-light table-hover table-bordered table-striped mt-5">
        <thead className="bg-info">
          <tr>
            <th scope="col">Patient Name</th>
            <th scope="col">Age</th>
            <th scope="col">Reason</th>
            <th scope="col">Blood Group</th>
            <th scope="col">Unit (in ml)</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Stock Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            if (request.status === 'Approved' || request.status === 'Rejected') {
              return (
                <tr key={request.id}>
                  <td>{request.patient_name}</td>
                  <td>{request.patient_age}</td>
                  <td>{request.reason}</td>
                  <td>{request.blood_group}</td>
                  <td>{request.Unit}</td>
                  <td>{request.date}</td>
                  <td>
                    {request.status === 'Approved' ? (
                      <span className="label success ">Approved</span>
                    ) : (
                      <span className="label danger">Rejected</span>
                    )}
                  </td>
                  <td>
                    <span className="label warning">
                      {request.status === 'Approved' ? `${request.Unit} Unit Deducted From Stock` : `0 Unit Deducted From Stock`}
                    </span>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>

    </>
  );
};

export default BloodRequestHistory;
