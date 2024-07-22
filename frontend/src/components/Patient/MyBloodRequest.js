// import React from 'react';


// function MyBloodRequest() {
  

  
//   return (
//     <>
//       <div className="container">
//         <h4 className="text-center">My Blood Request</h4><br />
//         <table className="table table-light table-hover table-bordered table-striped">
//           <thead className="bg-info">
//             <tr>
//               <th scope="col">Patient Name</th>
//               <th scope="col">Patient Age</th>
//               <th scope="col">Reason</th>
//               <th scope="col">Blood Group</th>
//               <th scope="col">Unit</th>
//               <th scope="col">Date</th>
//               <th scope="col">Status</th>
//             </tr>
//           </thead>
//           <tbody>
          
//               <tr key={formData.id}>
//                 <td>{formData.patientName}</td>
//                 <td>{formData.patientAge}</td>
//                 <td>{formData.reason}</td>
//                 <td>{formData.bloodGroup}</td>
//                 <td>{formData.unit}</td>
//                 <td>{formData.date}</td>
//                 <td>
//                   {formData.status === 'Approved' && <span className="label warning">Approved</span>}
//                   {formData.status === 'Rejected' && <span className="label success">Rejected</span>}
//                   {formData.status !== 'Approved' && formData.status !== 'Rejected' && <span style={{ color: 'white', marginLeft: '5px' , backgroundColor:"skyblue", padding:"5px"}} className="label info">Pending</span>}
//                 </td>
//               </tr>
           
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default MyBloodRequest;



import React, { useState, useEffect } from 'react';


function MyBloodRequest({ patientId }) {
  // State variable to store blood requests
  const [bloodRequests, setBloodRequests] = useState([]);
  const [message, setMessage] = useState('');

 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`https://localhost:7131/api/Blood/UserRequests/${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blood requests');
        }
        const data = await response.json();
        console.log(data);
    
        if (Array.isArray(data.UserRequests)) {
          setBloodRequests(data.UserRequests);
         
        } else {
          setMessage('No blood requests found');
        }
      } catch (error) {
        console.error('Error:', error.message);
        setMessage('Failed to fetch blood requests');
      }
    };

    if (patientId) {
      fetchRequests();
    }
  }, [patientId]);

  return (
    <>
      <div className="container mt-5">
        <h4 className="text-center">My Blood Requests</h4><br />
        <table className="table table-light table-hover table-bordered table-striped">
          <thead className="bg-info">
            <tr>
              <th scope="col">Patient Name</th>
              <th scope="col">Patient Age</th>
              <th scope="col">Reason</th>
              <th scope="col">Blood Group</th>
              <th scope="col">Unit</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {bloodRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.patient_name}</td>
                <td>{request.patient_age}</td>
                <td>{request.reason}</td>
                <td>{request.blood_group}</td>
                <td>{request.Unit}</td>
                <td>{request.date}</td>
                <td>
                  {request.status === 'Approved' && <span className="label warning">Approved</span>}
                  {request.status === 'Rejected' && <span className="label success">Rejected</span>}
                  {request.status !== 'Approved' && request.status !== 'Rejected' && <span style={{ color: 'white', marginLeft: '5px' , backgroundColor:"skyblue", padding:"5px"}} className="label info">Pending</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyBloodRequest;
