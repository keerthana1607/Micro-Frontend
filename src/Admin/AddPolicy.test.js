import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import AddPolicy from './AddPolicy';
import { BrowserRouter } from 'react-router-dom';

describe('AddPolicy Component', () => {

    test('renders the heading with "REGISTER YOUR POLICIES DETAILS"', () => {
        render(
            <BrowserRouter>
                <AddPolicy />
            </BrowserRouter>
        );
        const headingElement = screen.getByText(/REGISTER YOUR POLICIES DETAILS/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders policy name input field', () => {
        render(
            <BrowserRouter>
                <AddPolicy />
            </BrowserRouter>
        );
        const policyNameInput = screen.getByRole('textbox', { name: /Enter Policy Name/i });
        expect(policyNameInput).toBeInTheDocument();
    });

   

    test('renders policy type dropdown', () => {
        render(
            <BrowserRouter>
                <AddPolicy />
            </BrowserRouter>
        );
        const policyTypeSelect = screen.getByRole('combobox', { name: /Enter Policy Type/i });
        expect(policyTypeSelect).toBeInTheDocument();
    });

    test('renders submit button', () => {
        render(
            <BrowserRouter>
                <AddPolicy />
            </BrowserRouter>
        );
        const submitButton = screen.getByRole('button', { name: /SUBMIT/i });
        expect(submitButton).toBeInTheDocument();
    });

    test('renders cancel button', () => {
        render(
            <BrowserRouter>
                <AddPolicy />
            </BrowserRouter>
        );
        const cancelButton = screen.getByRole('link', { name: /CANCEL/i });
        expect(cancelButton).toBeInTheDocument();
    });

});
