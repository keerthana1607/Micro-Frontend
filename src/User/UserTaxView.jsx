// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import { IoMdJet } from "react-icons/io";
// import TimelapseIcon from '@mui/icons-material/Timelapse';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import {
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBCard,
//     MDBCardBody,
//     MDBCardImage,
//     MDBCardTitle,
// } from "mdb-react-ui-kit";
// import DriveEtaIcon from '@mui/icons-material/DriveEta';
// import Swal from "sweetalert2";
// const AdminViewPolicy = () => {


//     const [policy, setPolicy] = useState([]);




//     const win = sessionStorage.getItem("adminName");
//      const [click, setClick] = React.useState(false);

//     const handleClick = () => setClick(!click);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get("http://localhost:7737/taxpolicies/getAllPoliciesList");
//                 setPolicy(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const cancelPolicy = async (policyId) => {
//         try {
//             await axios.delete(`http://localhost:7737/taxpolicies/deletePolicy/${policyId}`);
//         } catch (error) {
//             if (error.response && error.response.status === 500) {
//                 Swal.fire({
//                     title: 'Error',
//                     text: 'Package is already booked by someone',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             } else {
//                 console.error(error);
//             }
//         }
//     }



//     return (
//         <>
//             <nav className="navbar">
//                 <div className="nav-container">
//                     <NavLink exact to="/" className="nav-logo">
//                         <span><IoMdJet />  E-tax calculator Management System
//                         </span>
//                         <span className="icon">
//                         </span>
//                     </NavLink>

//                     <ul
//                         className={click ? "nav-menu active" : "nav-menu"}
//                     >

//                         <li className="nav-item">
//                             <NavLink
//                                 exact
//                                 to="/adminhome"
//                                 activeClassName="active"
//                                 className="nav-links"
//                                 onClick={handleClick}
//                             >
//                                 <ArrowLeftIcon />BACK
//                             </NavLink>
//                         </li>



//                         <li className="nav-item">
//                             <NavLink
//                                 exact
//                                 activeClassName="active"
//                                 className="nav-links"
//                                 onClick={handleClick}
//                             >
//                                 {win} <AccountCircleIcon />
//                             </NavLink>
//                         </li>


//                     </ul>

//                 </div>
//             </nav>
//             <div className="container">
//                 <br />
//                 <div class="container-fluid my-2">
//     <div class="row justify-content-center">
//         {policy.map((policy) => (
//             <div class="col-md-4" key={policy.policyId}>
//                <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>


//                     <div class="card-header">
//                         <strong>Policy Name:</strong> {policy.policyName}
//                     </div>
//                     <ul class="list-group list-group-flush">
//                         <li class="list-group-item">
//                             <strong>effectiveFrom Date:</strong> {policy.effectiveFrom}
//                         </li>
//                         <li class="list-group-item">
//                             <strong>effectiveTo Date:</strong> {policy.effectiveTo}
//                         </li>
//                         <li class="list-group-item">
//                             <strong>Description:</strong> {policy.description}
//                         </li>
//                         <li class="list-group-item">
//                             <strong>PolicyType:</strong> {policy.policyType}
//                         </li>
//                         <li class="list-group-item">
//                             <strong>Income range From:</strong> {policy.incomeFrom}
//                         </li>
//                         <li class="list-group-item">
//                             <strong>Income range To:</strong> {policy.incomeTo}
//                         </li>
//                         <li class="list-group-item">
//                             <strong>Tax Rates:</strong> {policy.taxRates}
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         ))}
//     </div>
// </div>

//                                         {/* <br/> */}
//                                         <NavLink to={`/adminedit/${policy.policyId}`}><button className="btn btn-dark mx-2" >UPDATE POLICY</button></NavLink>
//                                         <button className="btn btn-danger" onClick={() => cancelPolicy(policy.policyId)} >DELETE POLICY</button>


                                 

//             </div>

//         </>
//     );
// };

// export default AdminViewPolicy;



import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { NavLink } from "react-router-dom";
import { IoMdJet } from "react-icons/io";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from "sweetalert2";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle } from "mdb-react-ui-kit";

const UserTaxView = () => {
    const [policy, setPolicy] = useState([]);
    const win = sessionStorage.getItem("userName");
    const [click, setClick] = React.useState(false);

    const handleClick = () => setClick(!click);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:7737/taxpolicies/getAllPoliciesList");
                setPolicy(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    

    return (
        <>
            {/* <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        <span> E-tax calculator Management System</span>
                        <span className="icon"></span>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/userhome"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                <ArrowLeftIcon /> BACK
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                {win} <AccountCircleIcon />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav> */}


<nav class="navbar navbar-expand-lg navbar-dark bg-dark user-tax-view-navbar">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
    <div class="d-flex align-items-center">
      <a class="nav-link text-white mr-4" href="/userhome"><ArrowLeftIcon /> BACK</a>

      <a class="nav-link text-white" href="#" onClick={handleClick}>Hi {win} <AccountCircleIcon /></a>
    </div>
  </div>
</nav>

<br/>
<br/>
<br/>

            <div className="container">
                <br />
                <div className="container-fluid my-2">
                    <div className="row justify-content-center">
                        {policy.map((policy) => (
                            <div className="col-md-4" key={policy.policyId}>
                                <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                                    <div className="card-header">
                                        <strong>Policy Name:</strong> {policy.policyName}
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong>Effective From:</strong> {policy.effectiveFrom}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Effective To:</strong> {policy.effectiveTo}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Description:</strong> {policy.description}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Policy Type:</strong> {policy.policyType}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Income Range From:</strong> {policy.incomeFrom}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Income Range To:</strong> {policy.incomeTo}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Tax Rates:</strong> {policy.taxRates}
                                        </li>
                                    </ul>
                                    {/* <div className="card-body d-flex justify-content-between align-items-center">
                                        <button 
                                            className="btn btn-danger" 
                                            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', marginRight: '0.5rem' }} 
                                            onClick={() => cancelPolicy(policy.policyId)}
                                        >
                                            DELETE POLICY
                                        </button>
                                        <NavLink to={`/editTax/${policy.policyId}`}>
                                            <button 
                                                className="btn btn-success" 
                                                style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                                            >
                                                UPDATE POLICY
                                            </button>
                                        </NavLink>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserTaxView;
