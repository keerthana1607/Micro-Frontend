
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditTax from './EditTax';
import { BrowserRouter } from 'react-router-dom';

describe('EditTax Component', () => {

    // Test Case 1: Check Rendering of the Heading
    test('renders the heading with "UPDATE POLICY DETAILS"', () => {
        render(
            <BrowserRouter>
                <EditTax />
            </BrowserRouter>
        );
        const headingElement = screen.getByText(/UPDATE POLICY DETAILS/i);
        expect(headingElement).toBeInTheDocument();
    });

    // Test Case 2: Check Rendering of the Navigation Link "Back to Home"
    test('renders the "Back to Home" navigation link', () => {
        render(
            <BrowserRouter>
                <EditTax />
            </BrowserRouter>
        );
        const backToHomeLink = screen.getByText(/Back to Home/i);
        expect(backToHomeLink).toBeInTheDocument();
    });

    // Test Case 3: Check Rendering of the Policy Id Field Label
    test('renders the Policy Id field label', () => {
        render(
            <BrowserRouter>
                <EditTax />
            </BrowserRouter>
        );
        const policyIdLabel = screen.getByLabelText(/Policy Id/i);
        expect(policyIdLabel).toBeInTheDocument();
    });

});