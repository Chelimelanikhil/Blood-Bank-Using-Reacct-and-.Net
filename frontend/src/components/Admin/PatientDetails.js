import React, { useState, useEffect } from 'react';

const PatientDetails = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://localhost:7131/api/Users/Users');
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        console.log(data);
        // Filter patients based on the correct property name
        const patientUsers = data.AllUsers.filter(user => user.user_Type === 'Patient');
        console.log('Patient users:', patientUsers);
        setPatients(patientUsers);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="container mt-5">
      <h4 className="text-center">PATIENT DETAILS</h4><br />
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
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.full_name}</td>
              <td>
              <td>{patient.Email}</td>
              </td>
              <td>{patient.Age}</td>
              <td>{patient.blood_group}</td>
              <td>{patient.Age}</td>
             
              <td>{patient.mobile}</td>
              <td className="text-right">
                <button className="btn btn-primary badge-pill" style={{ width: '80px' , marginRight:'10px'}}>
                  <a href={`/update-patient/${patient.id}`} style={{ textDecoration: 'none', color: 'white' }}>EDIT</a>
                </button>
                <button className="btn btn-danger badge-pill" style={{ width: '80px' }}>
                  <a href={`/delete-patient/${patient.id}`} style={{ textDecoration: 'none', color: 'white' }}>DELETE</a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetails;



