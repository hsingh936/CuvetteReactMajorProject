import React, { useState, useEffect } from 'react';
import styles from './NoteContainer.module.css';
import HomeImg from '../../images/Home.png';
import VectorImg from '../../images/Vector.png';
import BackArrowImg from '../../images/BackArrow.png';

function NoteContainer({ selectedGroup, notes, onBackButtonClick }) {
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState(notes || []);

  useEffect(() => {
    if (selectedGroup) {
      const storedNotes = localStorage.getItem(selectedGroup.name);
      if (storedNotes) {
        setNotesList(JSON.parse(storedNotes));
      }
    }
  }, [selectedGroup]);

  const handleSubmit = () => {
    if (newNote.trim() !== '') {
      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString();

      const newNoteItem = {
        content: newNote,
        date,
        time,
      };

      const updatedNotesList = [...notesList, newNoteItem];
      setNotesList(updatedNotesList);
      setNewNote('');

      if (selectedGroup) {
        localStorage.setItem(selectedGroup.name, JSON.stringify(updatedNotesList));
      }
    }
  };

  useEffect(() => {
    if (selectedGroup) {
      const storedNotes = localStorage.getItem(selectedGroup.name);
      if (storedNotes) {
        setNotesList(JSON.parse(storedNotes));
      }
    }
  }, [selectedGroup]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.RightPanel}>
      <div
        className={styles.groupName}
        style={{
          backgroundColor: selectedGroup ? 'rgba(232, 232, 232, 1)' : 'transparent',
        }}
      >
        {selectedGroup && (
          <button className={styles.backButton} onClick={onBackButtonClick}>
            <img src={BackArrowImg} alt="Back" />
          </button>
        )}
        {selectedGroup && (
          <div className={styles.groupColor} style={{ backgroundColor: selectedGroup.color }}>
            {selectedGroup.name && selectedGroup.name.slice(0, 2).toUpperCase()}
          </div>
        )}
        {selectedGroup && (
          <span className={styles.Name}>{selectedGroup.name}</span>
        )}
      </div>

      <div className={styles.noteContainer}>
        <div className={styles.noteList}>
          {notesList.map((note, index) => (
            <div className={styles.noteItem} key={index}>
              <div className='noteDateTime'>
                <p className={styles.noteTime}>{note.time}</p>
                <p className={styles.noteDate}>{note.date}</p>
              </div>
              <p className={styles.noteContent}>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedGroup && (
      <form onSubmit={handleSubmit}>
        <div className={styles.noteInput}>
          <div className={styles.textAreaContainer}>
            <textarea
            placeholder="Enter your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <img
            className={styles.Vector}
            src={VectorImg}
            alt="Submit"
            onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
   )}
      {!selectedGroup && (
        <div className={styles.defaultContent}>
          <img src={HomeImg} alt="" className={styles.Img1} />
          <h1 className={styles.heading2}>Pocket Notes</h1>
          <p className={styles.para}>
            Send and receive messages without keeping your phone online.<br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
      )}
    </div>
  );
}

export default NoteContainer;
