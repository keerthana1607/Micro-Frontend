// import React from 'react'
// import './Main.css';
// import { Link } from 'react-router-dom';



// const Main = () => {
//   return (
//     <div className='hello '>
//       <div className='hello-text'>
//         <h1>Streamline Your Taxes with Ease!!!</h1>
//         <p>
       
// Taxes are essential financial contributions that individuals and businesses make to support government functions and public services.
//  They fund critical areas such as infrastructure, education, healthcare, and social programs.
//         </p>
//         <Link to="/faq" className="btn-link">
//         <button className='btnn' >Explore More 
//         <i class="fa fa-caret-right" style={{fontSize: "24px",marginLeft:"10px"}}></i>
       
//         </button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Main


import React, { useState } from 'react';
import './Main.css';
import { FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Chatbot from '../Chatbot'; // Ensure path is correct

const Main = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className='hello'>
      <div className='hello-text'>
        <h1>Streamline Your Taxes with Ease!!!</h1>
        <p>
          Taxes are essential financial contributions that individuals and businesses make to support government functions and public services.
          They fund critical areas such as infrastructure, education, healthcare, and social programs.
        </p>
        <Link to="/faq" className="btn-link">
         <button className='btnn' >Explore More 
        <i class="fa fa-caret-right" style={{fontSize: "24px",marginLeft:"10px"}}></i>
        </button>
         </Link>
      </div>
     

      {/* Chatbot icon button */}
      <div className="chat-icon-container">
        <button className="chat-icon" onClick={toggleChat}>
          <FaComments />
        </button>
      </div>

      {/* Conditionally render Chatbot based on isChatOpen */}
      {isChatOpen && <Chatbot isOpen={isChatOpen} onClose={toggleChat} />}
    </div>
  );
};

export default Main;

