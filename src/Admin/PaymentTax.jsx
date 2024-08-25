import React, { useEffect, useState } from 'react'

import { Link, NavLink } from "react-router-dom";
import { IoMdJet } from "react-icons/io";
import axios from 'axios';
import FormServices from '../Services.jsx/FormServices';

export default function Paymentforms() {

    const [form, setForm] = useState([])



    useEffect(() => {
        loadAllBookings();
    }, []);


    const loadAllBookings = async () => {
        const result = await FormServices.getPaymentformList();
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
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink exact to="/adminhome" id="backTo" className="nav-link text-white">
          Back to Home
        </NavLink>
      </li>
    </ul>
  </div>
</nav>
<br/>
<h3 style={{ textAlign: 'center' }}>PAID TAX STATUS</h3>


            <div className="table-container">
                <table className="table border shadow table table table-striped " >
                    <thead className="table-dark" >
                        <tr>
                            <th scope="col">Form Id</th>
                            <th scope="col">Form Date</th>
                            <th scope="col">User Name</th>
                           
                            <th scope="col">Paid Amount</th>


                        </tr>
                    </thead>
                    <tbody>
                        {form.map((forms, index) => (

                            <tr>
                                <th scope="row" key={index}>{forms.formId}</th>
                                <td>{forms.formDate}</td>
                                <td>{forms.user.userName}</td>
                                <td><Link to={`/adminPay/${forms.formId}`}>{forms.calculatedTax}</Link></td>
                               


                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    );
}