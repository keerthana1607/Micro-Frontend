import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Paymentforms from './PaymentTax';
import { BrowserRouter } from 'react-router-dom';


describe('Paymentforms Component', () => {

    // Test Case 1: Check Rendering of the Heading
    test('renders the heading with "PAID TAX STATUS"', () => {
        render(
            <BrowserRouter>
                <Paymentforms />
            </BrowserRouter>
        );
        const headingElement = screen.getByText(/PAID TAX STATUS/i);
        expect(headingElement).toBeInTheDocument();
    });

    // Test Case 2: Check Rendering of the Navigation Link "Back to Home"
    test('renders the "Back to Home" navigation link', () => {
        render(
            <BrowserRouter>
                <Paymentforms />
            </BrowserRouter>
        );
        const backToHomeLink = screen.getByText(/Back to Home/i);
        expect(backToHomeLink).toBeInTheDocument();
    });

    // Test Case 3: Check Table Column Headers
    test('renders table column headers', () => {
        render(
            <BrowserRouter>
                <Paymentforms />
            </BrowserRouter>
        );
        const formIdHeader = screen.getByText(/Form Id/i);
        const formDateHeader = screen.getByText(/Form Date/i);
        const userNameHeader = screen.getByText(/User Name/i);
        const paidAmountHeader = screen.getByText(/Paid Amount/i);
        
        expect(formIdHeader).toBeInTheDocument();
        expect(formDateHeader).toBeInTheDocument();
        expect(userNameHeader).toBeInTheDocument();
        expect(paidAmountHeader).toBeInTheDocument();
    });

});
