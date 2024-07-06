import React, { useState } from 'react';
import './Journal.css'; // Import CSS file for custom styling

const JournalInsights = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chatGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Provide some insights on productivity.' }),
      });
      const data = await res.json();
      setResponse(data.choices[0].text);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insights">
      <h2>Insights</h2>
      <button onClick={handleGetInsights} disabled={loading}>
        {loading ? 'Loading...' : 'Get Insights'}
      </button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default JournalInsights;
