import React, { useState } from 'react';
import './Chatbot.css';

const defaultResponses = {
  "hi": "Hello! How can I assist you today?",
  "what is your name": "I am a chatbot. How can I help you?",
  "how can i provide any suggestions or feedback": "We welcome your opinions and feedback! Please use the contact page to fill out the form with your details and submit it. We will be notified of your concerns. Thank you for your support and feedback.",
  "how to tax is calculated":"Our application calculates the  tax through automatic calculation which provides easy way to know & pay your tax.",
  "how the tax calculation works":"'In accordance with government regulations, income up to ₹3 lakhs is tax-free. Therefore, when a user inputs their income amount, the system automatically deducts ₹3 lakhs from the total income. The remaining amount, after this deduction, is considered for further calculations. The taxable amount is then determined by subtracting the user’s deductions from this adjusted income. Tax is calculated based only on this taxable amount.",
  "how to pay tax": "You can pay tax through our application. Please follow the steps 1.Click on Apply Tax Return Form in the navigation bar 2. A form will appear. Please fill out the details and submit it 3.Once your form is approved, proceed to make the payment.",
 "how to track my form":"By clicking on Form Status in the navigation bar, you can check the status of your submitted form.",
 "how can i file by tax details":"By clicking on Calculated Form in the navigation bar, you can view the tax details for the form you submitted. If needed, you can also download the tax return form as a PDF.",
  "default": "I'm not sure how to respond to that. Can you please provide more details?"
};

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    const userMessage = input.trim().toLowerCase();
    if (userMessage) {
      setMessages([...messages, { text: userMessage, type: 'user' }]);

      // Generate a response based on predefined responses
      const botResponse = defaultResponses[userMessage] || defaultResponses["default"];
      setTimeout(() => {
        setMessages([...messages, { text: userMessage, type: 'user' }, { text: botResponse, type: 'bot' }]);
      }, 500); // Delay for a more natural conversation feel

      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <button className="close-btn" onClick={onClose}>X</button>
        <h4>Chat with us!</h4>
      </div>
      <div className="chatbox-content">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
