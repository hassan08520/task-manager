// frontend/src/App.js
import React, { useState } from 'react';

export default function App() {
  const [text, setText]     = useState('');
  const [status, setStatus] = useState('');

  // 🔧  Change this line if you open the site from another PC
   const BACKEND_URL = 'http://192.168.6.2:5000/api/messages';
  // Use 'http://192.168.6.2:5000/api/messages' from a different device

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Sending…');

    try {
      const res   = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data  = await res.json();

      if (res.ok) {
        setStatus('✅ Saved: ' + data.data.text);
        setText('');
      } else {
        setStatus('❌ Error: ' + data.error);
      }
    } catch (err) {
      setStatus('❌ Network error: ' + err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', fontFamily: 'Arial' }}>
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: '100%', padding: '0.5rem' }}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type something"
          required
        />
        <button style={{ marginTop: '1rem', width: '100%' }}>
          Send
        </button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}

