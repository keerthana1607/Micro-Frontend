import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import UserEdit from './UserEdit'; // Adjust the import path according to your file structure

describe('UserEdit Component', () => {

    test('renders heading with "UPDATE POLICIES DETAILS"', () => {
        render(
            <Router>
                <UserEdit />
            </Router>
        );

        // Check if the heading with "UPDATE POLICIES DETAILS" is rendered
        expect(screen.getByText(/UPDATE POLICIES DETAILS/i)).toBeInTheDocument();
    });

    test('renders "SUBMIT" button', () => {
        render(
            <Router>
                <UserEdit />
            </Router>
        );

        // Check if the text "SUBMIT" button is rendered
        expect(screen.getByText(/SUBMIT/i)).toBeInTheDocument();
    });

    test('renders "CANCEL" button', () => {
        render(
            <Router>
                <UserEdit />
            </Router>
        );

        // Check if the text "CANCEL" button is rendered
        expect(screen.getByText(/CANCEL/i)).toBeInTheDocument();
    });
});
