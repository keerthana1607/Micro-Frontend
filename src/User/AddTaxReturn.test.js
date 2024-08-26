import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTaxReturn from './AddTaxReturn';
import { BrowserRouter } from 'react-router-dom';

describe('AddTaxReturn Component', () => {
    
    // Test Case 1: Check Rendering of the Form Heading
    test('renders the form heading correctly', () => {
        render(
            <BrowserRouter>
                <AddTaxReturn />
            </BrowserRouter>
        );
        const headingElement = screen.getByText(/REGISTER TAX RETURN DETAILS/i);
        expect(headingElement).toBeInTheDocument();
    });

    // Test Case 2: Check Rendering of Form Labels
    test('renders form labels correctly', () => {
        render(
            <BrowserRouter>
                <AddTaxReturn />
            </BrowserRouter>
        );

        // Check if form labels are present
        const formDateLabel = screen.getByLabelText(/Form Date/i);
        const ageLabel = screen.getByLabelText(/Age/i);
        const incomeAmountLabel = screen.getByLabelText(/Income Amount/i);
        const deductionAmountLabel = screen.getByLabelText(/Deduction Amount/i);
        const taxableAmountLabel = screen.getByLabelText(/Taxable Amount/i);

        expect(formDateLabel).toBeInTheDocument();
        expect(ageLabel).toBeInTheDocument();
        expect(incomeAmountLabel).toBeInTheDocument();
        expect(deductionAmountLabel).toBeInTheDocument();
        expect(taxableAmountLabel).toBeInTheDocument();
    });

    // Test Case 3: Check Rendering of Submit Button
    test('renders the submit button correctly', () => {
        render(
            <BrowserRouter>
                <AddTaxReturn />
            </BrowserRouter>
        );

        // Check if the submit button is present
        const submitButton = screen.getByText(/Submit/i);
        expect(submitButton).toBeInTheDocument();
    });

    // Test Case 4: Check Rendering of File Upload Input
    test('renders the file upload input correctly', () => {
        render(
            <BrowserRouter>
                <AddTaxReturn />
            </BrowserRouter>
        );

        // Check if the file upload input is present
        const fileInput = screen.getByLabelText(/Proof \(Upload PDF\)/i);
        expect(fileInput).toBeInTheDocument();
    });

});
