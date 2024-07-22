// import React, { useState } from 'react';

// function BloodStock() {
//   const [bloodGroup, setBloodGroup] = useState('');
//   const [unit, setUnit] = useState('');

// ;

 

//   return (
//     <div className="container">
//       <h4 className="text-center">DONOR DETAILS</h4>
//       <div className="row">
//         {/* Render blood group cards */}
//         {/* Sample code for rendering blood group cards */}
//         {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((group) => (
//           <div key={group} className="col-sm-3">
//             <div className="card bg-light">
//               <div className="card-body">
//                 <div className="blood">
//                   <h2>{group} <i className="fas fa-tint"></i></h2>
//                 </div><br /><br />
//                 {/* Render unit for each blood group */}
//                 {/* Sample code for rendering unit */}
//                 {getUnitForGroup(group)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <hr />
//       {/* <div className="text-center">
//         <h3>Update Blood Unit</h3>
//         <form onSubmit={handleSubmit} className="form-inline">
//           <div className="form-group mx-sm-3 mb-6">
//             <select
//               name="bloodgroup"
//               className="form-control"
//               value={bloodGroup}
//               onChange={handleBloodGroupChange}
//             >
//               <option disabled defaultValue>
//                 Choose Blood Group
//               </option>
//               {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((group) => (
//                 <option key={group} value={group}>
//                   {group}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group mx-sm-3 mb-6">
//             <input
//               type="number"
//               className="form-control"
//               name="unit"
//               placeholder="Unit"
//               value={unit}
//               onChange={handleUnitChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary mb-2">
//             Update
//           </button>
//         </form>
//       </div> */}
//     </div>
//   );
// }

// // Helper function to get unit for each blood group (You can replace this with your own logic)
// function getUnitForGroup(group) {
//   // Sample logic, replace with your own
//   const units = {
//     'A+': 10,
//     'B+': 15,
//     'O+': 20,
//     'AB+': 25,
//     'A-': 5,
//     'B-': 8,
//     'O-': 12,
//     'AB-': 6,
//   };
//   return <div>{units[group]} units</div>;
// }

// export default BloodStock;

import React, { useState, useEffect } from 'react';

function BloodStock() {
  const [bloodStock, setBloodStock] = useState([]);
  const [totalBloodUnit, setTotalBloodUnit] = useState([]);
  const [donors, setDonors] = useState([]);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalApprovedRequests, setTotalApprovedRequests] = useState(0);

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

        // Set the total number of donors
        setTotalDonors(donorUsers.length);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const fetchBloodStock = async () => {
      try {
        const response = await fetch('https://localhost:7131/api/Admin/GetAllBloodGroupUnits');
        if (!response.ok) {
          throw new Error('Failed to fetch blood stock');
        }
        const data = await response.json();
        setBloodStock(data.AllData);

        const totalUnit = data.AllData.reduce((total, bloodGroup) => total + bloodGroup.Units, 0);
        setTotalBloodUnit(totalUnit);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await fetch('https://localhost:7131/api/Admin/GetAllDonations');
        if (!response.ok) {
          throw new Error('Failed to fetch blood donations');
        }
        const data = await response.json();
        setTotalRequests(data.AllData.length);

        const totalApprovedRequestsCount = data.AllData.reduce((total, donation) => {
          if (donation.status === 'Approved') {
            return total + 1;
          }
          return total;
        }, 0);
        setTotalApprovedRequests(totalApprovedRequestsCount);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchDonors();
    fetchBloodStock();
    fetchRequests();
  }, []);

  return (
    <div className="container" style={{ marginTop: "25px" }}>
      <h4 className="text-center">Blood Stock</h4>
      <div className="row" style={{ marginTop: "25px" }}>
        {/* Render blood group cards */}
        {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((group) => {
          // Find the total unit for the current blood group
          const totalUnit = bloodStock.reduce((total, bloodGroup) => {
            if (bloodGroup.BloodGroup.trim() === group) {
              return total + bloodGroup.Units;
            }
            return total;
          }, 0);

          return (
            <div key={group} className="col-sm-3" style={{ marginBottom: "10px" }}>
              <div className="card bg-light">
                <div className="card-body">
                  <div className="blood">
                    <h2>{group} <i className="fas fa-tint"></i></h2>
                  </div>
                  <p>Total Unit: {totalUnit}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Render additional cards */}
        <div className="col-sm-3" style={{ marginTop: "200px" }}>
          <div className="card bg-light">
            <div className="card-body">
              <div className="blood">
                <i className="fas fa-users"></i>
              </div>
              <br />
              <div>Total Donars<br /> {totalDonors}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-3" style={{ marginTop: "200px" }}>
          <div className="card bg-light">
            <div className="card-body">
              <div className="blood">
                <i className="fas fa-spinner"></i>
              </div>
              <br />
              <div>Total Requests <br /> {totalRequests}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-3" style={{ marginTop: "200px" }}>
          <div className="card bg-light">
            <div className="card-body">
              <div className="blood">
                <i className="far fa-check-circle"></i>
              </div>
              <br />
              <div>Approved Requests <br /> {totalApprovedRequests}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-3" style={{ marginTop: "200px" }}>
          <div className="card bg-light">
            <div className="card-body">
              <div className="blood">
                <i className="fas fa-tint xyz" style={{ background: "none" }}></i>
              </div>
              <br />
              <div>Total Blood Unit (in ml) <br /> {totalBloodUnit}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BloodStock;
