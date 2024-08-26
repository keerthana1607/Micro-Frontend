import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminViewPolicy from './AdminViewPolicy';
import { BrowserRouter } from 'react-router-dom';

describe('AdminViewPolicy Component', () => {
  
  test('renders the heading with "E-tax Calculator Management System"', () => {
    render(
      <BrowserRouter>
        <AdminViewPolicy />
      </BrowserRouter>
    );
    const headingElement = screen.getByText(/E-tax Calculator Management System/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders back link', () => {
    render(
      <BrowserRouter>
        <AdminViewPolicy />
      </BrowserRouter>
    );
    const backLink = screen.getByRole('link', { name: /BACK/i });
    expect(backLink).toBeInTheDocument();
  });

  test('renders admin greeting with account icon', () => {
    render(
      <BrowserRouter>
        <AdminViewPolicy />
      </BrowserRouter>
    );
    const adminGreeting = screen.getByText(/Hi/i);
    expect(adminGreeting).toBeInTheDocument();
  });

 

 

});
