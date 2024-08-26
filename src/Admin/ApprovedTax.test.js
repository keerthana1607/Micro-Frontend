import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApprovedTax from './ApprovedTax';
import { BrowserRouter } from 'react-router-dom';

describe('ApprovedTax Component', () => {

  // Test Case 1: Check Rendering of the Heading
  test('renders the heading with "APPROVED FORMS"', () => {
    render(
      <BrowserRouter>
        <ApprovedTax />
      </BrowserRouter>
    );
    const headingElement = screen.getByText(/APPROVED FORMS/i);
    expect(headingElement).toBeInTheDocument();
  });

  // Test Case 2: Verify Navigation Link "Back to Home"
  test('renders the "Back to Home" navigation link', () => {
    render(
      <BrowserRouter>
        <ApprovedTax />
      </BrowserRouter>
    );
    const backToHomeLink = screen.getByRole('link', { name: /Back to Home/i });
    expect(backToHomeLink).toBeInTheDocument();
  });

  // Test Case 3: Ensure Table Columns Are Rendered
  test('renders table columns for "TaxReturn form Id", "User Name", and "Calculated tax"', () => {
    render(
      <BrowserRouter>
        <ApprovedTax />
      </BrowserRouter>
    );
    const formIdColumn = screen.getByText(/TaxReturn form Id/i);
    const userNameColumn = screen.getByText(/User Name/i);
    const calculatedTaxColumn = screen.getByText(/Calculated tax/i);

    expect(formIdColumn).toBeInTheDocument();
    expect(userNameColumn).toBeInTheDocument();
    expect(calculatedTaxColumn).toBeInTheDocument();
  });

});
