import React, { useState, useEffect } from 'react';
import { firestoreDb } from './firebase-config';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import Toast from './Toast';
import './Journal.css'; // Import CSS file for custom styling

const JournalForm = ({ user }) => {
  const [entry, setEntry] = useState({
    goalsForToday: '',
    rating: 50, // Default value for the slider
    ratingNotes: '',
    improvementNotes: '',
    botheringInteractions: ''
  });
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchEntryForDate(currentDate);
    }
  }, [user]);

  const fetchEntryForDate = async (date) => {
    try {
      const docRef = doc(collection(firestoreDb, 'journalEntries'), date);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEntry(docSnap.data());
      } else {
        setEntry({
          date: date,
          goalsForToday: '',
          rating: 50, // Reset to default value for the slider
          ratingNotes: '',
          improvementNotes: '',
          botheringInteractions: ''
        });
      }
    } catch (error) {
      console.error("Error fetching data for date: ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntry(prevEntry => ({ ...prevEntry, [name]: value }));
  };

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;
    setCurrentDate(selectedDate);
    fetchEntryForDate(selectedDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEntry = { ...entry, date: currentDate }; // Use currentDate as the entry date
    try {
      const docRef = doc(collection(firestoreDb, 'journalEntries'), currentDate);
      await setDoc(docRef, newEntry, { merge: true });
      setToastMessage('Entry saved successfully');
      setShowToast(true);
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" value={currentDate} onChange={handleDateChange} />
        
        <label htmlFor="goalsForToday">Goals for Today</label>
        <textarea id="goalsForToday" name="goalsForToday" value={entry.goalsForToday} onChange={handleChange} />
        
        <label htmlFor="rating">Rate Today's Goal Achievement (1-100)</label>
        <div className="slider-value">{entry.rating}</div>
        <div className="slider-container">
          <input
            id="rating"
            type="range"
            name="rating"
            value={entry.rating}
            onChange={handleChange}
            min="1"
            max="100"
            className="slider"
          />
          <div className="slider-labels">
            <span>1</span>
            <span>100</span>
          </div>
        </div>
        
        <label htmlFor="ratingNotes">Notes on Rating</label>
        <textarea id="ratingNotes" name="ratingNotes" value={entry.ratingNotes} onChange={handleChange} />
        
        <label htmlFor="improvementNotes">What Could I Have Done Differently?</label>
        <textarea id="improvementNotes" name="improvementNotes" value={entry.improvementNotes} onChange={handleChange} />
        
        <label htmlFor="botheringInteractions">Any Bothering Interactions?</label>
        <textarea id="botheringInteractions" name="botheringInteractions" value={entry.botheringInteractions} onChange={handleChange} />
        
        <button type="submit">Save Entry</button>
      </form>
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
};

export default JournalForm;
