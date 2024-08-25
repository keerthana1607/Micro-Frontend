



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ViewTaxReturns() {
    const [taxReturns, setTaxReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
    const [showModal, setShowModal] = useState(false);
    const [selectedTaxReturn, setSelectedTaxReturn] = useState(null);

    useEffect(() => {
        const fetchTaxReturns = async () => {
            console.log(`Fetching tax returns for user ID: ${userId}`);
            try {
                if (userId) {
                    const response = await axios.get(`http://localhost:7737/taxreturns/getFormbyUserId/${userId}`);
                    console.log("API response data:", response.data);
                    setTaxReturns(response.data);
                } else {
                    console.error("User ID is not set.");
                }
            } catch (error) {
                console.error("Error fetching tax returns:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaxReturns();
    }, [userId]);

    const handleShowModal = (taxReturn) => {
        setSelectedTaxReturn(taxReturn);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTaxReturn(null);
    };

    const handleDownloadPDF = () => {
        const input = document.getElementById('modal-content');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('tax-return.pdf');
        });
    };

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    return (
        <>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark calculated-tax-navbar">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link text-white" href="/userhome">BACK</a>
      </li>
     
    </ul>
  </div>
</nav>


            <div className='container mt-4'>
                <h2 className='text-center mb-4'><b>View Tax Returns</b></h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Form Date</th>
                                <th>Age</th>
                                <th>Income Type</th>
                                <th>Income Amount</th>
                                <th>Deduction Type</th>
                                <th>Deduction Amount</th>
                                <th>Taxable Amount</th>
                                <th>Calculated Tax</th>
                                <th>View As Document</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxReturns.map((taxReturn) => (
                                <tr key={taxReturn.formid}> {/* Assuming `formid` is a unique identifier */}
                                    <td>{taxReturn.formDate}</td>
                                    <td>{taxReturn.age}</td>
                                    <td>{taxReturn.incomeType}</td>
                                    <td>{taxReturn.incomeAmount}</td>
                                    <td>{taxReturn.deductionType}</td>
                                    <td>{taxReturn.deductionAmount}</td>
                                    <td>{taxReturn.taxableAmount}</td>
                                    <td>{taxReturn.calculatedTax}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleShowModal(taxReturn)}>
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedTaxReturn && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tax Return Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id="modal-content">
                            <p><strong>Form Date:</strong> {selectedTaxReturn.formDate}</p>
                            <p><strong>Age:</strong> {selectedTaxReturn.age}</p>
                            <p><strong>Income Type:</strong> {selectedTaxReturn.incomeType}</p>
                            <p><strong>Income Amount:</strong> {selectedTaxReturn.incomeAmount}</p>
                            <p><strong>Deduction Type:</strong> {selectedTaxReturn.deductionType}</p>
                            <p><strong>Deduction Amount:</strong> {selectedTaxReturn.deductionAmount}</p>
                            <p><strong>Taxable Amount:</strong> {selectedTaxReturn.taxableAmount}</p>
                            <p><strong>Calculated Tax:</strong> {selectedTaxReturn.calculatedTax}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleDownloadPDF}>
                            Download as PDF
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}
