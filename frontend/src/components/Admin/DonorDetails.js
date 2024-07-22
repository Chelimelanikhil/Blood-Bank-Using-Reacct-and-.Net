// import React from 'react';

// function DonorDetails() {
//   return (
//     <div className="container">
//       <h4 className="text-center">DONOR DETAILS</h4><br />
//       <table className="table table-light table-hover table-bordered table-striped">
//         <thead className="bg-info">
//           <tr>
//             <th scope="col">Name</th>
//             <th scope="col">Profile</th>
//             <th scope="col">Blood Group</th>
//             <th scope="col">Address</th>
//             <th scope="col">Mobile</th>
//             <th className="text-right">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {donors.map((t, index) => (
//             <tr key={index}>
//               <td>{t.get_name}</td>
//               <td>
//                 <img src={t.profile_pic.url} alt="Profile Pic" height="40px" width="40px" />
//               </td>
//               <td>{t.bloodgroup}</td>
//               <td>{t.address}</td>
//               <td>{t.mobile}</td>
//               <td className="text-right">
//                 <button className="btn btn-primary badge-pill" style={{ width: '80px' }}>
//                   <a href={`update-donor/${t.id}`} style={{ textDecoration: 'none', color: 'white' }}>EDIT</a>
//                 </button>
//                 <button className="btn btn-danger badge-pill" style={{ width: '80px' }}>
//                   <a href={`delete-donor/${t.id}`} style={{ textDecoration: 'none', color: 'white' }}>DELETE</a>
//                 </button>
//               </td>
//             </tr>
//           ))} */}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default DonorDetails;



import React, { useState, useEffect } from 'react';

function DonorDetails() {
  const [donors, setDonors] = useState([]);

  
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch('https://localhost:7131/api/Users/Users');
        if (!response.ok) {
          throw new Error('Failed to fetch donors');
        }
        const data = await response.json();
        console.log(data);
        // Filter donors based on the correct property name
        const donorUsers = data.AllUsers.filter(user => user.user_Type === 'donor');
        console.log('Donor users:', donorUsers);
        setDonors(donorUsers);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchDonors();
  }, []);
  return (
    <div className="container mt-5">
      <h4 className="text-center">DONOR DETAILS</h4><br />
      <table className="table table-light table-hover table-bordered table-striped">
        <thead className="bg-info">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Blood Group</th>
            <th scope="col">Address</th>
            <th scope="col">Mobile</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {donors && donors.map((donor, index) => (
            <tr key={index}>
              <td>{donor.full_name}</td>
              <td>
                {donor.Email} 
              </td>
              <td>{donor.Age}</td>
              <td>{donor.blood_group}</td>
              <td>{donor.address}</td>
              <td>{donor.mobile}</td>
              <td className="text-right">
                <button className="btn btn-primary badge-pill" style={{ width: '80px' , marginRight:'10px'}}>
                  <a href={`update-donor/${donor.id}`} style={{ textDecoration: 'none', color: 'white' }}>EDIT</a>
                </button>
                <button className="btn btn-danger badge-pill" style={{ width: '80px' }}>
                  <a href={`delete-donor/${donor.id}`} style={{ textDecoration: 'none', color: 'white'}}>DELETE</a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonorDetails;

