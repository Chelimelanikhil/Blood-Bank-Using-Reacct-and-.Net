// import React, { useState } from 'react';

// const BloodStockUpdate = () => {
//   const [bloodGroup, setBloodGroup] = useState('');
//   const [unit, setUnit] = useState('');

//   const handleBloodGroupChange = (e) => {
//     setBloodGroup(e.target.value);
//   };

//   const handleUnitChange = (e) => {
//     setUnit(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform form submission logic here
//     console.log('Blood group:', bloodGroup);
//     console.log('Unit:', unit);
//     // Reset form fields
//     setBloodGroup('');
//     setUnit('');
//   };

//   return (
//     <div className="container">
//       <h3 className="text-center">Update Blood Unit</h3>
//       <form className="form-inline" onSubmit={handleSubmit}>
//         <div className="form-group mx-sm-3 mb-6">
//           <select
//             name="bloodgroup"
//             className="form-control"
//             value={bloodGroup}
//             onChange={handleBloodGroupChange}
//           >
//             <option disabled selected>
//               Choose Blood Group
//             </option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//           </select>
//         </div>
//         <div className="form-group mx-sm-3 mb-6">
//           <input
//             type="number"
//             className="form-control"
//             name="unit"
//             value={unit}
//             onChange={handleUnitChange}
//             placeholder="Unit"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mb-2">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BloodStockUpdate;



import React, { useState } from 'react';

const BloodStockUpdate = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate input
    if (!bloodGroup || !unit) {
      setError('Please select a blood group and enter the unit.');
      return;
    }
  
    if (parseInt(unit) <= 0) {
      setError('Unit must be a positive integer.');
      return;
    }
  
    // Perform form submission logic here
    try {
      const url = `https://localhost:7131/api/Admin/AdjustBloodUnits?bloodGroup=${encodeURIComponent(bloodGroup)}&adjustment=${encodeURIComponent(unit)}`;
      const response = await fetch(url, {
        method: 'POST',
      });
  
      if (!response.ok) {
        throw new Error('Failed to update blood unit.');
      }
  
      // Reset form fields and error message
      setBloodGroup('');
      setUnit('');
      setError('');
  
      // Optionally, display a success message to the user
      alert('Blood unit updated successfully.');
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to update blood unit. Please try again.');
    }
  };
  

  return (
    <div className="container mt-5">
      <h3 className="text-center">Update Blood Unit</h3>
      <form className="form-inline mt-5" onSubmit={handleSubmit}>
        <div className="form-group mx-sm-3 mb-6">
          <select
            name="bloodgroup"
            className="form-control"
            value={bloodGroup}
            onChange={handleBloodGroupChange}
          >
            <option disabled value="">
              Choose Blood Group
            </option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group mx-sm-3 mb-6">
          <input
            type="number"
            className="form-control"
            name="unit"
            value={unit}
            onChange={handleUnitChange}
            placeholder="Unit"
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Update
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default BloodStockUpdate;
