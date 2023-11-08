import React, { useState, useRef, useEffect } from 'react';
import './CreateGroupForm.css';

function CreateGroupForm({ onCreateGroup, onClose }) {
  const colors = [
    'rgba(179, 139, 250, 1)',
    'rgba(255, 121, 242, 1)',
    'rgba(67, 230, 252, 1)',
    'rgba(241, 149, 118, 1)',
    'rgba(0, 71, 255, 1)',
    'rgba(102, 145, 255, 1',
  ];
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const formRef = useRef(null);

  const handleCreateGroup = () => {
    if (groupName.trim() !== '') {
      onCreateGroup(groupName, selectedColor);
      setGroupName('');
      onClose(); 
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="create-group-form" ref={formRef}>
        <h3>Create New Notes Group</h3>
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            placeholder="Enter your group name...."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="custom-label">Choose Color:</label>
          <div className="color-options">
            <div className="color-selector">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-buttons">
          <button onClick={handleCreateGroup} className="btn2">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupForm;
