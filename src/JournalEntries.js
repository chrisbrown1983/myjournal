import React, { useState, useEffect } from 'react';
import { firestoreDb } from './firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Toast from './Toast';
import './Journal.css'; // Import CSS file for custom styling

const JournalEntries = ({ user }) => {
  const [entries, setEntries] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestoreDb, 'journalEntries'));
      const fetchedEntries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort entries from most recent to oldest
      fetchedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(fetchedEntries);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestoreDb, 'journalEntries', id));
      setEntries(entries.filter(entry => entry.id !== id));
      setToastMessage('Entry deleted successfully');
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEntries = entries.filter(entry => 
    entry.goalsForToday.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.ratingNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.improvementNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.botheringInteractions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="entries">
      <input
        type="text"
        placeholder="Search entries..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {filteredEntries.map(entry => (
        <div key={entry.id} className="entry">
          <h2>Entry for {new Date(entry.date + "T00:00:00").toLocaleDateString()}</h2> {/* Updated to only show date */}
          <p><strong>Goals for Today:</strong> {entry.goalsForToday}</p>
          <p><strong>Rating:</strong> {entry.rating}</p>
          <p><strong>Rating Notes:</strong> {entry.ratingNotes}</p>
          <p><strong>Improvement Notes:</strong> {entry.improvementNotes}</p>
          <p><strong>Bothering Interactions:</strong> {entry.botheringInteractions}</p>
          <button className="delete-button" onClick={() => handleDelete(entry.id)}>Delete Entry</button>
        </div>
      ))}
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default JournalEntries;
