import React, { useState } from 'react';
import Topbar from './TopBar';

function SendMessage() {
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // Send a POST request to the Nest.js backend API to create a new user
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message, topic: 'chat' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      // Handle the error, display an error message, or perform any other error-related actions
    }
  }

  return (
    <div>
      <Topbar />
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default SendMessage;
