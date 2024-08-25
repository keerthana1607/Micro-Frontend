



import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IoMdJet } from "react-icons/io";
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Swal from 'sweetalert2';

export default function UserViewStatus() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [form, setForm] = useState([]);
  const winid = sessionStorage.getItem("userId");
  const win = sessionStorage.getItem("userName");

  const loadAllForms = async () => {
    try {
      const res = await axios.get(`http://localhost:7737/taxreturns/getFormbyUserId/${winid}`);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

//   const cancelForm = async (formId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`http://localhost:7737/taxreturns/deleteForm/${formId}`)
//           .then(() => {
//             Swal.fire(
//               'Deleted!',
//               'Your Form has been deleted.',
//               'success'
//             );
//             loadAllForms();
//           })
//           .catch((err) => console.log(err));
//       }
//     });
//   };

  useEffect(() => {
    loadAllForms();
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'orange' ,fontWeight: 'bold' };
      case 'Approved':
        return { color: 'green' ,fontWeight: 'bold' };
      case 'Rejected':
        return { color: 'red',fontWeight: 'bold'  };
        case 'Payment Done':
        return { color: 'blue',fontWeight: 'bold'  };
      default:
        return {};
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark user-view-status-navbar">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="/userhome"><ArrowLeftIcon /> BACK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/userprofile" onClick={handleClick}>{win} <AccountCircleIcon /></a>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <h3 style={{ textAlign: 'center' }}>TAX RETURN FORM STATUS</h3>

      <div className="table-container">
        <table className="table border shadow table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Form Date</th>
              <th scope="col">Calculated Tax</th>
              <th scope="col">Form Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {form.map((forms, index) => (
              <tr key={index}>
                <td>{forms.formDate}</td>
                <td><Link to={`/userview/${forms.formId}`}>{forms.calculatedTax}</Link></td>
                <td style={statusStyle(forms.formStatus)}>
                  {forms.formStatus}
                </td>
                <td>
                  {forms.formStatus === 'Approved' ? (
                    <Link className="btn btn-success" id='bookpt' to={`/paymentpage/${forms.formId}`}><CurrencyRupeeIcon /> <b>MAKE PAYMENT</b></Link>
                  ) : (
                    <Link className="btn btn-light" id='bookpt'><CurrencyRupeeIcon /> <b>MAKE PAYMENT</b></Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
