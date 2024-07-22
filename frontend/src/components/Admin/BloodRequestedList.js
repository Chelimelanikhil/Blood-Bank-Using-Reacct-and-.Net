// import React from 'react';

// const BloodRequestedList = () => {
//   return (
//     <div className="container">
//       {/* {requests.length > 0 ? (
//         <>
//           <h4 className="text-center">Blood Requested</h4><br />
//           {message && <h5 className="text-center" style={{ color: 'red' }}>{message}</h5>}
//           <table className="table table-light table-hover table-bordered table-striped">
//             <thead className="bg-info">
//               <tr>
//                 <th scope="col">Patient Name</th>
//                 <th scope="col">Age</th>
//                 <th scope="col">Reason</th>
//                 <th scope="col">Blood Group</th>
//                 <th scope="col">Unit (in ml)</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Status</th>
//                 <th className="text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((request) => (
//                 <tr key={request.id}>
//                   <td>{request.patient_name}</td>
//                   <td>{request.patient_age}</td>
//                   <td>{request.reason}</td>
//                   <td>{request.bloodgroup}</td>
//                   <td>{request.unit}</td>
//                   <td>{request.date}</td>
//                   <td>{request.status}</td>
//                   <td className="text-right">
//                     <button className="btn btn-primary badge-pill" style={{ width: '100px' }}>
//                       <a href={`/update-approve-status/${request.id}`} style={{ textDecoration: 'none', color: 'white' }}>Approve</a>
//                     </button>
//                     <button className="btn btn-danger badge-pill" style={{ width: '80px' }}>
//                       <a href={`/update-reject-status/${request.id}`} style={{ textDecoration: 'none', color: 'white' }}>Reject</a>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       ) : (
//         <h5>No Blood Request By Patient / Donor!</h5>
//       )} */}
//     </div>
//   );
// };

// export default BloodRequestedList;


import React, { useState, useEffect } from 'react';

const BloodRequestedList = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    try {
      const response = await fetch('https://localhost:7131/api/Admin/GetAllRequests');
      if (!response.ok) {
        throw new Error('Failed to fetch blood requests');
      }
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data.AllData)) {
        setRequests(data.AllData.filter(request => request.status === 'Pending'));
      } else {
        setMessage('No blood requests found');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Failed to fetch blood requests');
    }
  };
  useEffect(() => {
    

    fetchRequests();
  }, []);

  // const handleApprove = async (id) => {
  //   try {
  //     const response = await fetch(`https://localhost:7131/api/Admin/ApproveRequest?id=${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Add any additional headers if needed
  //       },
  //       // You can include a request body if needed
  //       // body: JSON.stringify({}),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to approve request');
  //     }
  //     fetchRequests();
  //     // Handle success if needed
  //   } catch (error) {
  //     console.error('Error approving request:', error.message);
  //     // Handle error if needed
  //   }
  // };


  
  const handleApprove = async (id, bloodGroup, unit) => {
    try {

       // Adjust blood units
       const url = `https://localhost:7131/api/Admin/AdjustBloodUnits?bloodGroup=${encodeURIComponent(bloodGroup)}&adjustment=${encodeURIComponent(-unit)}`;

       const response2 = await fetch(url, {
         method: 'POST',
       });
       if (!response2.ok) {
        alert("stock Not Available");
        return
       }
   
      // Update donation status
      const response1 = await fetch(`https://localhost:7131/api/Admin/ApproveRequest?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response1.ok) {
        throw new Error('Failed to approve donation');
      }
  
     
      // Fetch updated donations
      fetchRequests();// Assuming fetchDonations is defined in the parent component
    } catch (error) {
      console.error('Error handling donation approval:', error.message);
      // Handle error if needed
    }
  };
  
  const handleReject = async (id) => {
    try {
      const response = await fetch(`https://localhost:7131/api/Admin/RejectRequest?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        // You can include a request body if needed
        // body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error('Failed to reject request');
      }
      fetchRequests();
      // Handle success if needed
    } catch (error) {
      console.error('Error rejecting request:', error.message);
      // Handle error if needed
    }
  };

  return (
    <div className="container mt-5">
      {requests.length > 0 ? (
        <>
          <h4 className="text-center">Blood Requested</h4><br />
          {message && <h5 className="text-center" style={{ color: 'red' }}>{message}</h5>}
          <table className="table table-light table-hover table-bordered table-striped">
            <thead className="bg-info">
              <tr>
                <th scope="col">Patient Name</th>
                <th scope="col">Age</th>
                <th scope="col">Reason</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Unit (in ml)</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.patient_name}</td>
                  <td>{request.patient_age}</td>
                  <td>{request.reason}</td>
                  <td>{request.blood_group}</td>
                  <td>{request.Unit}</td>
                  <td>{request.date}</td>
                  <td>{request.status}</td>
                  <td className="text-right">
                    <button
  className="btn btn-primary badge-pill"
  style={{ width: '100px', marginRight: '10px' }}
  onClick={() => handleApprove(request.id, request.blood_group, request.Unit)}
>
  APPROVE
</button>
                    <button
                      className="btn btn-danger badge-pill"
                      style={{ width: '80px' }}
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h5>No Blood Request By Patient / Donor!</h5>
      )}
    </div>
  );
};

export default BloodRequestedList;
