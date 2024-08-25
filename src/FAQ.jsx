import React, { useState } from 'react';
import './FAQ.css'; // Import your CSS file for styling
import { ArrowBack } from '@mui/icons-material'; // Import the MUI icon

const FAQ = () => {
  const faqs = [
    { 
      question: 'How can a user can fill the Tax-Return Form',
      answer: 'A User can click the "Apply Tax-Return in the navbar & fill the required details to fill & submit the form.' 
    },
    { 
      question: 'How to tax is calculated?',
      answer: 'Our application calculates the  tax through automatic calculation which provides easy way to know & pay your tax.' 
    },
    { 
      question: 'How can an user know about tax policies?',
      answer: 'After logging in, the users can view the various tax policies that have been implemented ,by clicking the tax-policies in nav bar.' 
    },
    { 
      question: 'How the tax calculation works?',
      answer: 'In accordance with government regulations, income up to ₹3 lakhs is tax-free. Therefore, when a user inputs their income amount, the system automatically deducts ₹3 lakhs from the total income. The remaining amount, after this deduction, is considered for further calculations. The taxable amount is then determined by subtracting the user’s deductions from this adjusted income. Tax is calculated based only on this taxable amount.' 
    },
    { 
      question: 'How does the user know about their form status?',
      answer: 'By clicking on the form status in the navbar, users can check whether their form has been approved. Additionally, users will receive an email notification informing them of the approval status. If the form is approved, users can proceed to make the payment through the payment gateway.'

      
    },
    { 
      question: 'What happens after a user makes a payment?',
      answer: 'After a user makes a payment, the status of the form updates to the "Tax Paid" card.' 
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark login-navbar">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">E-Tax Calculator Management System</a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="/userhome"><ArrowBack /> Back to Home</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <span className="arrow">{expandedIndex === index ? '▲' : '▼'}</span>
            </div>
            {expandedIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
