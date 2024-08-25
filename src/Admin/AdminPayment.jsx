import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoMdJet } from "react-icons/io";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';



import Swal from "sweetalert2";

const AdminPaymentCheck = () => {

    const [forms, setForms] = useState({
        user: {

        },
        taxreturn: {

        }
    });
    let navigate = useNavigate();


    const win = sessionStorage.getItem("userName");
    const winid = sessionStorage.getItem("userId");
    console.log(winid);

    const [click, setClick] = React.useState(false);

    const handleClick = () => setClick(!click);

    const { formId } = useParams();

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:7737/taxreturns/GetformId/${formId}`);
            setForms(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        fetchProducts();
    }, []);

    const cancelForm = async (formId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                axios.delete(`http://localhost:7737/taxreturns/deleteForm/${formId}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your Form has been deleted.',
                            'success',
                             navigate("/userbookcheck")

                        );
                        fetchProducts();
                    })
                    .catch((err) => console.log(err));
            }
        });
    };


    return (
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
    <NavLink exact to="/" className="navbar-brand text-white">
       E-tax Calculator Management System
    </NavLink>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink exact to="/adminhome" className="nav-link text-white">
          <ArrowLeftIcon /> Back
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact className="nav-link text-white">
        Hi  {win} <AccountCircleIcon />
        </NavLink>
      </li>
    </ul>
  </div>
</nav>

            <div className="container">
                <br />
                <div class="container-fluid my-6 d-flex justify-content-center">
    <div class="row justify-content-center">
        <div class="col-md-4 col-lg-6 col-xl-10 d-flex justify-content-center">
        <div className="card" style={{ width: '18rem' }}>
                <div class="card-header">
                <strong>Policy name:</strong> {forms.taxreturn.calculatedTax}
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <strong>effectiveFrom Date:</strong> {forms.taxreturn.userName}
                    </li>
                   
                </ul>
            </div>
        </div>
    </div>
</div>

            </div>

        </>
    );

};

export default AdminPaymentCheck;