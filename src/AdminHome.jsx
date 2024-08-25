


//------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { NavLink ,Link} from 'react-router-dom';
// import Paper from '@mui/material/Paper';
// import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
// import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import styled from '@emotion/styled';
// import axios from 'axios';
// import './AdminHome.css';  // Make sure this file includes relevant styles

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// export default function AdminHome() {
//   const [pending, setPending] = useState(0);
//   const [approve, setApprove] = useState(0);
//   const [reject, setReject] = useState(0);
//   const [payment, setPayment] = useState(0);

//   const adminName = sessionStorage.getItem('adminName');

//   useEffect(() => {
//     if (!adminName) {
//       window.location.href = '/';
//     } else {
//       loadPending();
//       loadApproved();
//       loadPayment();
//       loadRejected();
//     }
//   }, [adminName]);

//   const loadPending = () => {
//     axios.get("http://localhost:7737/taxreturns/getpendingCount")
//       .then((res) => setPending(res.data))
//       .catch((err) => console.log(err));
//   };

//   const loadApproved = () => {
//     axios.get("http://localhost:7737/taxreturns/getapproveCount")
//       .then((res) => setApprove(res.data))
//       .catch((err) => console.log(err));
//   };

//   const loadRejected = () => {
//     axios.get("http://localhost:7737/taxreturns/getrejectedCount")
//       .then((res) => setReject(res.data))
//       .catch((err) => console.log(err));
//   };

//   const loadPayment = () => {
//     axios.get("http://localhost:7737/taxreturns/getpaymentCount")
//       .then((res) => setPayment(res.data))
//       .catch((err) => console.log(err));
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = '/';
//   };

//   return (
//     <>
// <header className="navbar navbar-expand-lg navbar-light bg-dark">
//   <div className="container-fluid">
//     <NavLink className="navbar-brand text-white" to="/">
//       E-tax Calculator Management System
//     </NavLink>
//     <div id="navbarNavAltMarkup">
//       <ul className="navbar-nav ms-auto">
//         <li className="nav-item">
//           <NavLink className="nav-link text-white" to="/addpolicy">
//             <LibraryAddIcon /> Add Tax Policies
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link text-white" to="/adminViewPolicy">
//             <VisibilityIcon /> View Tax Policies
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link text-white" to="/" onClick={handleLogout}>
//             <ArrowLeftIcon /> Sign out
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <span className="nav-link text-white">
//             {adminName} <AccountCircleIcon />
//           </span>
//         </li>
//       </ul>
//     </div>
//   </div>
// </header>



     


// <div className="container mt-4">
//   <div className="row">
//     <div className="col-md-6 d-flex justify-content-center mb-3">
//       <div className="card bg-dark text-white text-center p-3" style={{ width: '400px' }}>
//         <Link className="text-white text-decoration-none" to="/pendingtax">
//           <h3>PENDING FORMS</h3>
//           <PendingActionsIcon style={{ fontSize: '40px' }} />
//         </Link>
//         <h1>{pending}</h1>
//       </div>
//     </div>

//     <div className="col-md-6 d-flex justify-content-center mb-3">
//       <div className="card bg-dark text-white text-center p-3" style={{ width: '400px' }}>
//         <Link className="text-white text-decoration-none" to="/approvedRequest">
//           <h3>APPROVED FORMS</h3>
//           <CheckBoxIcon style={{ fontSize: '40px' }} />
//         </Link>
//         <h1>{approve}</h1>
//       </div>
//     </div>

//     <div className="col-md-6 d-flex justify-content-center mb-3">
//       <div className="card bg-dark text-white text-center p-3" style={{ width: '400px' }}>
//         <Link className="text-white text-decoration-none" to="/payment">
//           <h3>PAYMENT STATUS</h3>
//           <CheckBoxIcon style={{ fontSize: '40px' }} />
//         </Link>
//         <h1>{payment}</h1>
//       </div>
//     </div>

//     <div className="col-md-6 d-flex justify-content-center mb-3">
//       <div className="card bg-dark text-white text-center p-3" style={{ width: '400px' }}>
//         <Link className="text-white text-decoration-none" to="/rejectedform">
//           <h3>REJECTED FORMS</h3>
//           <ThumbDownAltTwoToneIcon style={{ fontSize: '40px' }} />
//         </Link>
//         <h1>{reject}</h1>
//       </div>
//     </div>
//   </div>
// </div>


//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PieChart from './PieChart';  // Import the PieChart component
import BarChart from './BarChart';  // Import the BarChart component
import './AdminHome.css';  // Make sure this file includes relevant styles

export default function AdminHome() {
  const [pending, setPending] = useState(0);
  const [approve, setApprove] = useState(0);
  const [reject, setReject] = useState(0);
  const [payment, setPayment] = useState(0);

  const adminName = sessionStorage.getItem('adminName');
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminName) {
      window.location.href = '/';
    } else {
      loadPending();
      loadApproved();
      loadPayment();
      loadRejected();
    }
  }, [adminName]);

  const loadPending = () => {
    axios.get("http://localhost:7737/taxreturns/getpendingCount")
      .then((res) => setPending(res.data))
      .catch((err) => console.log(err));
  };

  const loadApproved = () => {
    axios.get("http://localhost:7737/taxreturns/getapproveCount")
      .then((res) => setApprove(res.data))
      .catch((err) => console.log(err));
  };

  const loadRejected = () => {
    axios.get("http://localhost:7737/taxreturns/getrejectedCount")
      .then((res) => setReject(res.data))
      .catch((err) => console.log(err));
  };

  const loadPayment = () => {
    axios.get("http://localhost:7737/taxreturns/getpaymentCount")
      .then((res) => setPayment(res.data))
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-white" to="/">
            E-tax Calculator Management System
          </NavLink>
          <div id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/addpolicy">
                  <LibraryAddIcon /> Add Tax Policies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/adminViewPolicy">
                  <VisibilityIcon /> View Tax Policies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/" onClick={handleLogout}>
                  <ArrowLeftIcon /> Sign out
                </NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link text-white">
                  {adminName} <AccountCircleIcon />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mb-3">
            <div className="card bg-dark text-white text-center p-3" style={{ width: '100%' }}>
              <h3>PENDING FORMS</h3>
              <PieChart
                data={[pending, approve, reject, payment]}
              />
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center mb-3">
            <div className="card bg-dark text-white text-center p-3" style={{ width: '100%' }}>
              <h3>FORM STATUS</h3>
              <BarChart
                data={[pending, approve, reject, payment]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
