import React, { useEffect, useState } from 'react';

import { NavLink } from "react-router-dom";
import { IoMdJet } from "react-icons/io";
import FormServices from '../Services.jsx/FormServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function RejectedTax() {
  const [form, setForm] = useState([]);
  const win = sessionStorage.getItem("adminName");

  useEffect(() => {
    loadAllForms();
  }, []);

  const loadAllForms = async () => {
    const result = await FormServices.getRejectedformList();
    setForm(result.data);
    console.log(result.data);
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
    <div  id="navbarNavAltMarkup">
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
      <div>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
         
          flexDirection: 'column' // Stack elements vertically
        }}
      >
        <h3>REJECTED FORMS</h3>
        <div className="table-container" style={{ width: '80%', maxWidth: '800px' }}>
          {form.length === 0 ? (
            <h4>No rejected Forms !!</h4>
          ) : (
            <table className="table border shadow table-striped" style={{ width: '100%' }}>
              <thead className="table-dark">
                <tr>
                  <th scope="col">Form Id</th>
                  <th scope="col">Form Date</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Calculated tax</th>
                </tr>
              </thead>
              <tbody>
                {form.map((forms, index) => (
                  <tr key={index}>
                    <th scope="row">{forms.formId}</th>
                    <td>{forms.formDate}</td>
                    <td>{forms.user.userName}</td>
                    <td>{forms.calculatedTax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}