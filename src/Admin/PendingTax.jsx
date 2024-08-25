

import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormServices from '../Services.jsx/FormServices';
import { Modal } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Pendingform() {
  const [form, setForm] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const win = sessionStorage.getItem("adminName");

  useEffect(() => {
    loadAllForms();
  }, []);

  const loadAllForms = async () => {
    try {
      const result = await FormServices.getPendingforms();
      setForm(result.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const approveForm = async (formId) => {
    setLoading(true); // Show loader
    try {
      await axios.put(`http://localhost:7737/taxreturns/updateform/${formId}`);
      setTimeout(() => { // Simulate a delay
        Swal.fire({
          title: 'Tax Return Approved',
          text: 'An approved email has been sent to the concerned person',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        loadAllForms();
        setLoading(false); // Hide loader
      }, 5000); // 5-second delay
    } catch (error) {
      console.error("Error approving form:", error);
      setLoading(false); // Hide loader in case of error
    }
  };

  const rejectForm = async (formId) => {
    setLoading(true); // Show loader
    try {
      await axios.put(`http://localhost:7737/taxreturns/rejectform/${formId}`);
      setTimeout(() => { // Simulate a delay
        Swal.fire({
          title: 'Tax Return Rejected',
          text: 'Rejection email has been sent to the concerned person',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        loadAllForms();
        setLoading(false); // Hide loader
      }, 5000); // 5-second delay
    } catch (error) {
      console.error("Error rejecting form:", error);
      setLoading(false); // Hide loader in case of error
    }
  };

  const handleViewDocument = async (formId) => {
    try {
      const response = await axios.get(`http://localhost:7737/taxreturns/GetformId/${formId}`);
      const imageData = response.data.proof; // Adjust based on your response structure
      if (imageData) {
        setSelectedImage(`data:image/jpeg;base64,${imageData}`); // Adjust MIME type if necessary
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <NavLink exact to="/" className="navbar-brand text-white">
            E-Tax Calculator Management System
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink exact to="/adminhome" className="nav-link text-white">
                  Back to Home
                </NavLink>
              </li>
              <li className="nav-item ms-3">
                <NavLink exact className="nav-link text-white">
                  {win} <AccountCircleIcon />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <div className="table-container">
          <table className="table border shadow table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col" style={{ padding: '20px' }}>Form Id</th>
                <th scope="col" style={{ padding: '20px' }}>Form Date</th>
                <th scope="col" style={{ padding: '20px' }}>User Name</th>
                <th scope="col" style={{ padding: '20px' }}>Calculated Tax</th>
                <th scope="col" style={{ padding: '20px' }}>Proof</th>
                <th scope="col" style={{ padding: '20px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {form.map((forms) => (
                <tr key={forms.formId}>
                  <td style={{ padding: '20px' }}>{forms.formId}</td>
                  <td style={{ padding: '20px' }}>{forms.formDate}</td>
                  <td style={{ padding: '20px' }}>{forms.user.userName}</td>
                  <td style={{ padding: '20px' }}>{forms.calculatedTax}</td>
                  <td style={{ padding: '10px' }}>
                    {forms.formId ? (
                      <button
                        className="btn btn-info"
                        onClick={() => handleViewDocument(forms.formId)}
                      >
                        View Proof
                      </button>
                    ) : (
                      'No Proof'
                    )}
                  </td>
                  <td>
                    <Link className="btn btn-success btn-outline-dark mx" id='bookpt' onClick={() => approveForm(forms.formId)}>
                      <b>APPROVE</b>
                    </Link>
                    <Link className="btn btn-danger btn-outline-dark mx-2" id='bookpt' onClick={() => rejectForm(forms.formId)}>
                      <b>REJECT</b>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="loader-container">
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
          </svg>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Document Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalBodyStyle}>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Proof"
              style={imageStyle}
            />
          ) : (
            <p>No image available</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

const modalBodyStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh', // Adjust height as needed
  overflow: 'hidden',
};

const imageStyle = {
  maxWidth: '100%', // Ensure the image fits within the modal
  maxHeight: '70vh', // Adjust height as needed
  objectFit: 'contain', // Ensure the image is contained within its box
};

// Loader styles
const loaderStyles = `
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  }
  .pl {
    width: 6em;
    height: 6em;
  }
  .pl__ring {
    animation: ringA 2s linear infinite;
  }
  .pl__ring--a {
    stroke: #f42f25;
  }
  .pl__ring--b {
    animation-name: ringB;
    stroke: #f49725;
  }
  .pl__ring--c {
    animation-name: ringC;
    stroke: #255ff4;
  }
  .pl__ring--d {
    animation-name: ringD;
    stroke: #f42582;
  }
  @keyframes ringA {
    from, 4% {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -330;
    }
    12% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -335;
    }
    32% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -595;
    }
    40%, 54% {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -660;
    }
    62% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -665;
    }
    82% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -925;
    }
    90%, to {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -990;
    }
  }
  @keyframes ringB {
    from, 12% {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -110;
    }
    20% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -115;
    }
    40% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -195;
    }
    48%, 62% {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }
    70% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }
    90% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -305;
    }
    98%, to {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -330;
    }
  }
  @keyframes ringC {
    from {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: 0;
    }
    8% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -5;
    }
    28% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -175;
    }
    36%, 58% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }
    66% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }
    86% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -395;
    }
    94%, to {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -440;
    }
  }
  @keyframes ringD {
    from, 8% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: 0;
    }
    16% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -5;
    }
    36% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -175;
    }
    44%, 50% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }
    58% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }
    78% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -395;
    }
    86%, to {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -440;
    }
  }
`;

const Loader = () => (
  <div className="loader-container">
    <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
      <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
      <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
      <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
      <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
    </svg>
  </div>
);

// Inject the loader CSS
const injectLoaderCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = loaderStyles;
  document.head.appendChild(style);
};

injectLoaderCSS();
