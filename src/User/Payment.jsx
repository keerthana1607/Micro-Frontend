import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoMdJet } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";

export default function Payment() {

    let navigate = useNavigate()

    const [click, setClick] = React.useState(false);

    const handleClick = () => setClick(!click);

    const win = sessionStorage.getItem("userName");
    const winid = sessionStorage.getItem("userId");
    console.log(winid);

    const { formId } = useParams();

    const [counter, setCounter] = useState(0);

    const [form, setForm] = useState({
        user: {

        },
       
    });
    console.log(form)
    const loadAllForms = async () => {
        await axios
            .get(`http://localhost:7737/taxreturns/GetformId/${formId}`)
            .then((res) => setForm(res.data)
            )

            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadAllForms();
    }, []);


    const fireAlert = async (formId) => {
        if (formId) {
            await axios.put(`http://localhost:7737/taxreturns/updatePayment/${formId}`)
            Swal.fire({
                title: 'This is Just a Confirmation to proceed your payment.',
                html: `
                    <p> Are You Sure to continue?</p>
                `,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes Please",
                cancelButtonText: "Cancel",
                icon: 'question'
            }
            ).then((result) => {
                if (result.isConfirmed) {
                    setCounter(counter + 1)
                    Swal.fire('Payment Successful', '', 'success');
                    navigate("/userhome")

                } else {
                    Swal.fire(' Cancelled', '', 'error')
                }
            })
        } else {
            Swal.fire('Error', 'Form ID is not provided', 'error');
        }
    }

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardSelect = (card) => {
        if (selectedCard === card) {
            setSelectedCard(null);
        } else {
            setSelectedCard(card);
        }
    }

    console.log(form)

    return (

        <> <nav class="navbar navbar-expand-lg navbar-dark bg-dark calculated-tax-navbar">
        <div class="container-fluid">
          <a class="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-white" href="/userhome">BACK</a>
            </li>
           
          </ul>
        </div>
      </nav>
      
            <body style={{ backgroundColor: 'whitesmoke' }}>
                <MDBContainer
                    className="py-7"
                    fluid
                    style={{ backgroundColor: 'white', marginTop: '5%' }}
                >
                    <MDBRow className=" d-flex justify-content-center">
                        <MDBCol md="10" lg="20" xl="5">



                            <MDBCard className="rounded-3">
                                <MDBCardBody className="p-4">
                                    <div className="text-center mb-4">
                                        {/* <h3>Settings</h3> */}
                                        <h2>PAYMENT </h2>
                                        <h4 style={{ textAlign: "left" }}>Tax Amount :<b>{form.calculatedTax} </b></h4>


                                    </div>
                                    <p className="fw-bold mb-4 pb-4">Saved cards:</p>
                                    <div className="d-flex flex-row align-items-center mb-4 pb-4">
                                        <img
                                            className="img-fluid"
                                            src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                                        />
                                        <div className="flex-fill mx-3">
                                            <div className="form-outline">
                                                <MDBInput
                                                    label="Card Number"
                                                    id="form1"
                                                    type="text"
                                                    size="lg"
                                                    value="**** **** **** 3193"
                                                    disabled={selectedCard !== 'mastercard'}
                                                    onClick={() => handleCardSelect('mastercard')}
                                                />
                                            </div>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={selectedCard === 'mastercard'} onChange={() => handleCardSelect('mastercard')} />
                                                {/* <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Select</label> */}
                                            </div>
                                        </div>
                                        <a href="#!">Remove card</a>

                                    </div>
                                    {/* <h6>Tour Cost : {price}</h6> */}

                                    <h5>Add New Card </h5>
                                    <MDBRow className="my-4">
                                        <MDBCol size="7">
                                            <MDBInput
                                                label="Card Number"
                                                id="form4"
                                                type="text"
                                                size="lg"
                                            />
                                        </MDBCol>
                                        <MDBCol size="3">
                                            <MDBInput
                                                label="Expire"
                                                id="form5"
                                                type="password"
                                                size="lg"
                                                placeholder="MM/YYYY"
                                            />
                                        </MDBCol>
                                        <MDBCol size="2">
                                            <MDBInput
                                                label="CVV"
                                                id="form6"
                                                type="password"
                                                size="lg"
                                                placeholder="CVV"
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <button color="success" size="lg" block className="btn btn-dark" onClick={() => fireAlert(formId)}>
                                        PROCEED
                                    </button>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </body>
        </>
    );
}