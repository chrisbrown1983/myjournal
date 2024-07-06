import React, { useState } from 'react';
import './App.css';
import Auth from './Auth';
import JournalForm from './JournalForm';
import JournalEntries from './JournalEntries';
import JournalInsights from './JournalInsights';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

  return (
    <div className="App">
      <h1>Daily Journal</h1>
      {user ? (
        <>
          <div className="tabs">
            <button 
              className={activeTab === 'form' ? 'active' : ''} 
              onClick={() => setActiveTab('form')}
            >
              Journal Form
            </button>
            <button 
              className={activeTab === 'entries' ? 'active' : ''} 
              onClick={() => setActiveTab('entries')}
            >
              Entries
            </button>
            <button 
              className={activeTab === 'insights' ? 'active' : ''} 
              onClick={() => setActiveTab('insights')}
            >
              Insights
            </button>
          </div>
          {activeTab === 'form' && <JournalForm user={user} />}
          {activeTab === 'entries' && <JournalEntries user={user} />}
          {activeTab === 'insights' && <JournalInsights />}
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
};

export default App;
