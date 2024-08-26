import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pendingform from './PendingTax';
import { BrowserRouter } from 'react-router-dom';




describe('Pendingform Component', () => {

    // Test Case 1: Check Rendering of the Heading
    test('renders the heading with "E-Tax Calculator Management System"', () => {
        render(
            <BrowserRouter>
                <Pendingform />
            </BrowserRouter>
        );
        const headingElement = screen.getByText(/E-Tax Calculator Management System/i);
        expect(headingElement).toBeInTheDocument();
    });

    // Test Case 2: Check Rendering of Navigation Links
    test('renders "Back to Home" navigation link', () => {
        render(
            <BrowserRouter>
                <Pendingform />
            </BrowserRouter>
        );
        const backToHomeLink = screen.getByText(/Back to Home/i);
        expect(backToHomeLink).toBeInTheDocument();
    });

    test('renders admin name with account icon', () => {
        // Mock sessionStorage
        sessionStorage.setItem("adminName", "Admin");
        render(
            <BrowserRouter>
                <Pendingform />
            </BrowserRouter>
        );
        const adminName = screen.getByText(/Admin/i);
        expect(adminName).toBeInTheDocument();
    });

    // Test Case 3: Check Table Column Headers
    test('renders table column headers', () => {
        render(
            <BrowserRouter>
                <Pendingform />
            </BrowserRouter>
        );
        const formIdHeader = screen.getByText(/Form Id/i);
        const formDateHeader = screen.getByText(/Form Date/i);
        const userNameHeader = screen.getByText(/User Name/i);
        const calculatedTaxHeader = screen.getByText(/Calculated Tax/i);
        const proofHeader = screen.getByText(/Proof/i);
        const actionsHeader = screen.getByText(/Actions/i);

        expect(formIdHeader).toBeInTheDocument();
        expect(formDateHeader).toBeInTheDocument();
        expect(userNameHeader).toBeInTheDocument();
        expect(calculatedTaxHeader).toBeInTheDocument();
        expect(proofHeader).toBeInTheDocument();
        expect(actionsHeader).toBeInTheDocument();
    });

    
});
