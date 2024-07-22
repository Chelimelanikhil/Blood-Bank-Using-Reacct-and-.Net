import React, { useState, useEffect } from 'react';

function BloodRequestSummary({ patientId }) {
  const [requests, setRequests] = useState([]);
  const [requestMade, setRequestMade] = useState(0);
  const [requestPending, setRequestPending] = useState(0);
  const [requestApproved, setRequestApproved] = useState(0);
  const [requestRejected, setRequestRejected] = useState(0);
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
          setRequests(data.UserRequests);
          setRequestMade(data.UserRequests.length);
          setRequestPending(data.UserRequests.filter((request) => request.status === 'Pending').length);
          setRequestApproved(data.UserRequests.filter((request) => request.status === 'Approved').length);
          setRequestRejected(data.UserRequests.filter((request) => request.status === 'Rejected').length);
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
        <div className="row">
          <div className="col-sm-3">
            <div className="card bg-light">
              <div className="card-body">
                <div className="blood">
                  <i className="fas fa-sync-alt xyz"style={{background:"none"}}></i>
                </div><br />
                <div>
                  Request Made <br />
                  {requestMade}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="card bg-light">
              <div className="card-body">
                <div className="blood">
                  <i className="fas fa-sync xyz"style={{background:"none"}}></i>
                </div><br />
                <div>
                  Pending Request <br />
                  {requestPending}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="card bg-light">
              <div className="card-body">
                <div className="blood">
                  <i className="fas fa-check-circle xyz" style={{background:"none"}}></i>
                </div><br />
                <div>
                  Approved Request<br />
                  {requestApproved}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="card bg-light">
              <div className="card-body">
                <div className="blood">
                  <i className="fas fa-times-circle xyz"style={{background:"none"}}></i>
                </div><br />
                <div>
                  Rejected Request <br />
                  {requestRejected}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BloodRequestSummary;
