// import React, { useState, useEffect } from 'react';

// const BloodDonationDetails = () => {

//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch('https://localhost:7131/api/Admin/GetAllDonations');
//         if (!response.ok) {
//           throw new Error('Failed to fetch patients');
//         }
//         const data = await response.json();
//         console.log(data);
//         // Filter patients based on the correct property name
      
//         setDonations(data.AllData);
//       } catch (error) {
//         console.error('Error:', error.message);
//       }
//     };

//     fetchPatients();
//   }, []);
//   return (
//     <>
    
//    <style>
//     {`
//       .label {
//         color: white;
//         padding: 8px;
//       }
      
//       .success {background-color: #4CAF50;} /* Green */
//       .info {background-color: #2196F3;} /* Blue */
//       .warning {background-color: #ff9800;} /* Orange */
//       .danger {background-color: #f44336;} /* Red */
//       .other {background-color: #e7e7e7; color: black;} /* Gray */
    
//     `}
//    </style>
//     <div className="container mt-5">
//       <h4 className="text-center">BLOOD DONATION DETAILS</h4><br />
//       <table className="table table-light table-hover table-bordered table-striped">
//         <thead className="bg-info">
//           <tr>
//             <th scope="col">Donor Name</th>
//             <th scope="col">Disease</th>
//             <th scope="col">Age</th>
//             <th scope="col">Blood Group</th>
//             <th scope="col">Unit</th>
//             <th scope="col">Request Date</th>
//             <th scope="col">Status</th>
//             <th className="text-right">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {donations.map((donation) => (
//             <tr key={donation.id}>
//               <td>{donation.donor_name}</td>
//               <td>{donation.disease}</td>
//               <td>{donation.Age}</td>
//               <td>{donation.blood_group}</td>
//               <td>{donation.Unit}</td>
//               <td>{donation.date}</td>
//               <td>{donation.status}</td>
//               {donation.status === 'Pending' && (
//                 <td className="text-right">
//                   <button className="btn btn-primary badge-pill" style={{ width: '100px' , marginRight:'10px'}}>
//                     <a href={`/approve-donation/${donation.id}`} style={{ textDecoration: 'none', color: 'white' }}>APPROVE</a>
//                   </button>
//                   <button className="btn btn-danger badge-pill" style={{ width: '80px' }}>
//                     <a href={`/reject-donation/${donation.id}`} style={{ textDecoration: 'none', color: 'white'}}>REJECT</a>
//                   </button>
//                 </td>
//               )}
//               {donation.status === 'Approved' && (
//                 <td><span className="label warning">{donation.Unit} Unit Added To Stock</span></td>
//               )}
//               {donation.status !== 'Pending' && donation.status !== 'Approved' && (
//                 <td><span className="label danger">0 Unit Added To Stock</span></td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// };

// export default BloodDonationDetails;




import React, { useState, useEffect } from 'react';
const BloodDonationDetails = () => {
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState('');

  const fetchDonations = async () => {
    try {
      const response = await fetch('https://localhost:7131/api/Admin/GetAllDonations');
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data.AllData)) {
        setDonations(data.AllData.filter(request => request.status === 'Pending'));
      } else {
        setMessage('No blood requests found');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Failed to fetch blood requests');
    }
  };
     

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleApprove = async (id, bloodGroup, unit) => {
    try {
      // Update donation status
      const response1 = await fetch(`https://localhost:7131/api/Admin/ApproveDonation?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response1.ok) {
        throw new Error('Failed to approve donation');
      }
  
      // Adjust blood units
      const url = `https://localhost:7131/api/Admin/AdjustBloodUnits?bloodGroup=${encodeURIComponent(bloodGroup)}&adjustment=${encodeURIComponent(unit)}`;
      const response2 = await fetch(url, {
        method: 'POST',
      });
      if (!response2.ok) {
        throw new Error('Failed to adjust blood units');
      }
  
      // Fetch updated donations
      fetchDonations(); // Assuming fetchDonations is defined in the parent component
    } catch (error) {
      console.error('Error handling donation approval:', error.message);
      // Handle error if needed
    }
  };
  

  const handleReject = async (id) => {
    try {
      const response = await fetch(`https://localhost:7131/api/Admin/RejectDonation?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to approve donation');
      }
      // If rejection is successful, fetch the updated donations
      fetchDonations();
    } catch (error) {
      console.error('Error rejecting donation:', error.message);
    }
  };



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
        <h4 className="text-center">BLOOD DONATION DETAILS</h4><br />
        <table className="table table-light table-hover table-bordered table-striped">
          <thead className="bg-info">
            <tr>
              <th scope="col">Donor Name</th>
              <th scope="col">Disease</th>
              <th scope="col">Age</th>
              <th scope="col">Blood Group</th>
              <th scope="col">Unit</th>
              <th scope="col">Request Date</th>
              <th scope="col">Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.donor_name}</td>
                <td>{donation.disease}</td>
                <td>{donation.Age}</td>
                <td>{donation.blood_group}</td>
                <td>{donation.Unit}</td>
                <td>{donation.date}</td>
                <td>{donation.status}</td>
                {donation.status === 'Pending' && (
                  <td className="text-right">
                   <button
  className="btn btn-primary badge-pill"
  style={{ width: '100px', marginRight: '10px' }}
  onClick={() => handleApprove(donation.id, donation.blood_group, donation.Unit)}
>
  APPROVE
</button>

                    <button className="btn btn-danger badge-pill" style={{ width: '80px' }} onClick={() => handleReject(donation.id)}>
                      REJECT
                    </button>
                  </td>
                )}
                {donation.status === 'Approved' && (
                  <td><span className="label warning">{donation.Unit} Unit Added To Stock</span></td>
                )}
                {donation.status !== 'Pending' && donation.status !== 'Approved' && (
                  <td><span className="label danger">0 Unit Added To Stock</span></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BloodDonationDetails;
