import React, { useState } from 'react';

function MakeBloodRequest({ patientId }) {
    // State variables for form fields
    const [formData, setFormData] = useState({
        user_id: patientId,
        patient_name: '',
        patient_age: null,
        blood_group: '',
        Unit: null,
        reason: '',
        date: new Date().toISOString(),
        status: 'Pending',
    });

    // Function to handle input change
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send the form data to the backend
            await fetch('https://localhost:7131/api/Blood/Request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Navigate to the MyBloodRequest component and pass the form data

        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error if necessary
        }
    };

    return (
        <div className='container mt-5'>
            <div className="card card-5">
                <div className="card-heading">
                    <h2 className="title text-center">MAKE BLOOD REQUEST</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
                        {/* CSRF token */}
                        <input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}" />

                        {/* Form fields */}
                        <div className="form-group">
                            <label htmlFor="patient_name">Patient Name</label>
                            <input type="text" id="patient_name" name="patient_name" value={formData.patient_name} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="patient_age">Patient Age</label>
                            <input type="number" id="patient_age" name="patient_age" value={formData.patient_age} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reason">Reason</label>
                            <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} required className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="blood_group">Blood Group</label>
                            <select id="blood_group" name="blood_group" value={formData.blood_group} onChange={handleChange} className="form-control">
                                <option disabled selected>Choose option</option>
                                <option>O+</option>
                                <option>O-</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Unit">Unit (in ml)</label>
                            <input type="number" id="Unit" name="Unit" value={formData.Unit} onChange={handleChange} required className="form-control" />
                        </div>

                        <div className="form-group">
                            <button className="btn btn--radius-2 btn-danger" type="submit">REQUEST</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MakeBloodRequest;
