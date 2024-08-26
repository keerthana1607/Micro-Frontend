import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import UserTaxView from './UserTaxView'; // Adjust the import path according to your file structure

describe('UserTaxView Component', () => {

  

    test('renders "BACK" link', () => {
        render(
            <Router>
                <UserTaxView />
            </Router>
        );

        // Check if the "BACK" link is rendered
        expect(screen.getByText(/BACK/i)).toBeInTheDocument();
    });

  
});
