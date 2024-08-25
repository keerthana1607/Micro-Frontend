import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import FormServices from '../Services.jsx/FormServices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ApprovedTax() {

    const [form, setForm] = useState([])
    const win = sessionStorage.getItem("adminName");


    useEffect(() => {
        loadAllForms();
    }, []);


    const loadAllForms = async () => {
        const result = await FormServices.getApprovedformList();
        setForm(result.data);
        console.log(result.data)

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
<br/>
            <div 
      style={{
        display: 'flex',
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',      // Center vertically
                    // Full viewport height
      }}
    >
      <h3>APPROVED FORMS</h3>
    </div>

            <div 
      className="table-container"
      style={{
        display: 'flex',
        justifyContent: 'center', // Centers the table horizontally
        marginTop: '20px' // Adds space above the table (adjust as needed)
      }}
    >
      <table 
        className="table border shadow table-striped"
        style={{
          width: '80%', // Adjust width as needed
          maxWidth: '800px' // Set a maximum width for the table
        }}
      >
        <thead className="table-dark">
          <tr>
            <th scope="col">TaxReturn form Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Calculated tax</th>
          </tr>
        </thead>
        <tbody>
          {form.map((forms, index) => (
            <tr key={index}>
              <th scope="row">{forms.formId}</th>
              <td>{forms.user.userName}</td>
              <td>{forms.calculatedTax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        </div>
    );
}
