import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRegister from './UserRegister';  // Adjust the import path if necessary

describe('UserRegister Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <UserRegister />
      </Router>
    );
  });

  test('renders "USER REGISTRATION" heading', () => {
    // Check if the "USER REGISTRATION" heading is rendered
    expect(screen.getByText(/USER REGISTRATION/i)).toBeInTheDocument();
  });

  test('renders "Enter your User Name" label', () => {
    // Check if the "Enter your User Name" label is rendered
    expect(screen.getByLabelText(/Enter your User Name/i)).toBeInTheDocument();
  });

  test('renders "Enter Password" label', () => {
    // Check if the "Enter Password" label is rendered
    expect(screen.getByLabelText(/Enter Password/i)).toBeInTheDocument();
  });

  test('renders "Confirm Password" label', () => {
    // Check if the "Confirm Password" label is rendered
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  test('renders "Enter Mobile Number" label', () => {
    // Check if the "Enter Mobile Number" label is rendered
    expect(screen.getByLabelText(/Enter Mobile Number/i)).toBeInTheDocument();
  });

  test('renders "Enter Your Email" label', () => {
    // Check if the "Enter Your Email" label is rendered
    expect(screen.getByLabelText(/Enter Your Email/i)).toBeInTheDocument();
  });

  test('renders "Address" label', () => {
    // Check if the "Address" label is rendered
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
  });

  test('renders "SIGN UP" button', () => {
    // Check if the "SIGN UP" button is rendered
    expect(screen.getByRole('button', { name: /SIGN UP/i })).toBeInTheDocument();
  });

  test('renders "Already have an account? Click here!" link', () => {
    // Check if the "Already have an account? Click here!" link is rendered
    expect(screen.getByText(/Already have an account\? Click here!/i)).toBeInTheDocument();
  });
});
