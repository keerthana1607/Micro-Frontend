import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminHome from './AdminHome';  // Adjust the import path if necessary
import axios from 'axios';


describe('AdminHome Component', () => {
 

  
  test('renders "Add Tax Policies" link', () => {
    render(
      <Router>
        <AdminHome />
      </Router>
    );

    // Check if the "Add Tax Policies" link is rendered
    expect(screen.getByText(/Add Tax Policies/i)).toBeInTheDocument();
  });

  test('renders "View Tax Policies" link', () => {
    render(
      <Router>
        <AdminHome />
      </Router>
    );

    // Check if the "View Tax Policies" link is rendered
    expect(screen.getByText(/View Tax Policies/i)).toBeInTheDocument();
  });

  test('renders "Sign out" link', () => {
    render(
      <Router>
        <AdminHome />
      </Router>
    );

    // Check if the "Sign out" link is rendered
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  test('renders "E-tax Calculator Management System" brand name', () => {
    render(
      <Router>
        <AdminHome />
      </Router>
    );

    // Check if the "E-tax Calculator Management System" brand name is rendered
    expect(screen.getByText(/E-tax Calculator Management System/i)).toBeInTheDocument();
  });
});
