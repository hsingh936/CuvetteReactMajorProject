import React, { useState} from 'react';
import './App.css';
import NoteContainer from './Components/NoteContainer/NoteContainer';
import Sidebar from './Components/Sidebar/Sidebar';
import CreateGroupForm from './Components/CreateGroupForm/CreateGroupForm';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  

  const [groups, setGroups] = useState(() => {
    const storedGroups = localStorage.getItem('groups');
    return storedGroups ? JSON.parse(storedGroups) : [];
  });

  const openCreateGroupForm = () => {
    setIsFormVisible(true);
  };

  const closeCreateGroupForm = () => {
    setIsFormVisible(false);
  };

  const handleCreateGroup = (groupName, selectedColor) => {
    const newGroup = { name: groupName, color: selectedColor, notes: [] };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setSelectedGroup(newGroup);
    setIsFormVisible(false);

    localStorage.setItem('groups', JSON.stringify([...groups, newGroup]));
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const colors = [
    'rgba(179, 139, 250, 1)',
    'rgba(255, 121, 242, 1)',
    'rgba(67, 230, 252, 1)',
    'rgba(241, 149, 118, 1)',
    'rgba(0, 71, 255, 1)',
    'rgba(102, 145, 255, 1)',
  ];

  return (
    <div className="App">
      <Sidebar
        openCreateGroupForm={openCreateGroupForm}
        groups={groups}
        onGroupClick={handleGroupClick}     
      />

      {isFormVisible && (
        <CreateGroupForm onCreateGroup={handleCreateGroup} onClose={closeCreateGroupForm} colors={colors} />
      )}

      {selectedGroup ? (
        <NoteContainer
          selectedGroup={selectedGroup}
          notes={selectedGroup.notes}
          addNote={(newNote) => {
            const currentDate = new Date();
            const date = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
            const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newNoteItem = {
              content: newNote,
              date,
              time,
            };

            setGroups((prevGroups) =>
              prevGroups.map((group) =>
                group.name === selectedGroup.name
                  ? { ...group, notes: [...(group.notes || []), newNoteItem] }
                  : group
              )
            );

            localStorage.setItem(selectedGroup.name, JSON.stringify([...(selectedGroup.notes || []), newNoteItem]));
          }}
        />
      ) : (
        <NoteContainer />
      )}
    </div>
  );
}

export default App;
