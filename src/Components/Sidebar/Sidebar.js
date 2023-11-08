import React, { useEffect, useState } from 'react';
import './Sidebar.css';

function Sidebar({ openCreateGroupForm, groups, onGroupClick }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    onGroupClick(group);
  };

  return (
    <div className="sidebar">
      <h2 className="heading1">Pocket Notes</h2>
      <button className="btn1" onClick={openCreateGroupForm}>
        + Create Notes Group
      </button>
      <div className="group-list">
        <ul>
          {groups.map((group, index) => (
            <li key={index}>
              <div
                className={`group-item ${selectedGroup === group ? 'selected' : ''}`}
                onClick={() => handleGroupClick(group)}
              >
                <div
                  className="group-color"
                  style={{ backgroundColor: group.color }}
                >
                  {group.name && group.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="group-name">{group.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
