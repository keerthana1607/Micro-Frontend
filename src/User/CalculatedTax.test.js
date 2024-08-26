import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewTaxReturns from './CalculatedTax';
import { BrowserRouter } from 'react-router-dom';




describe('ViewTaxReturns Component', () => {
    // Test Case 1: Check Rendering of the Table Heading
    test('renders the table heading correctly', async () => {
       
        render(
            <BrowserRouter>
                <ViewTaxReturns />
            </BrowserRouter>
        );

        const headingElement = screen.getByText(/View Tax Returns/i);
        expect(headingElement).toBeInTheDocument();
    });

    // Test Case 2: Check Rendering of Table Columns
    test('renders the table columns correctly', async () => {
      
        render(
            <BrowserRouter>
                <ViewTaxReturns />
            </BrowserRouter>
        );

        // Check if the table headers are present
        const headers = [
            'Form Date',
            'Age',
            'Income Type',
            'Income Amount',
            'Deduction Type',
            'Deduction Amount',
            'Taxable Amount',
            'Calculated Tax',
            'View As Document'
        ];

        headers.forEach(header => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

   

});
