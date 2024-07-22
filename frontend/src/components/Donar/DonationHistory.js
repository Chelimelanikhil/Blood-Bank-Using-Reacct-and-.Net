
import React, { useState, useEffect } from 'react';

function DonationHistory({ donorId }) {

  const [bloodDonations, setBloodDonations] = useState([]);
  const [message, setMessage] = useState('');

 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`https://localhost:7131/api/Blood/UserDonations/${donorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blood requests');
        }
        const data = await response.json();
        console.log(data);
    
        if (Array.isArray(data.UserDonations)) {
          setBloodDonations(data.UserDonations);
         
        } else {
          setMessage('No blood requests found');
        }
      } catch (error) {
        console.error('Error:', error.message);
        setMessage('Failed to fetch blood requests');
      }
    };

    if (donorId) {
      fetchRequests();
    }
  }, [donorId]);
  return (
    <div className="container mt-5">
      <h4 className="text-center">My Donation History</h4><br />
      <table className="table table-light table-hover table-bordered table-striped">
        <thead className="bg-info">
          <tr>
            <th scope="col">Donor Name</th>
            <th scope="col">Donor Age</th>
            <th scope="col">Blood Group</th>
            <th scope="col">Unit</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {bloodDonations.map(donation => (
            <tr key={donation.id}>
              <td>{donation.donor_name}</td>
              <td>{donation.donor_age}</td>
              <td>{donation.blood_group}</td>
              <td>{donation.Unit}</td>
              <td>{donation.date}</td>
              <td>
                {donation.status === 'Approved' && <span className="label warning"style={{ color: 'white', marginLeft: '0px' ,backgroundColor:"lightgreen", padding:"5px"}} >Approved</span>}
                {donation.status === 'Rejected' && <span className="label success" style={{ color: 'white', marginLeft: '0px' ,backgroundColor:"red", padding:"5px"}}>Rejected</span>}
                {(donation.status !== 'Approved' && donation.status !== 'Rejected') && <span style={{ color: 'white', marginLeft: '0px' ,backgroundColor:"skyblue", padding:"5px"}} className="label info">Pending</span>}
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationHistory;
