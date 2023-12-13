import React from 'react';
import DoctorList from './components/DoctorList';
import AddSlot from './components/AddSlot';

function App() {
  return (
    <div>
      <h1>Doctor Appointment Scheduler</h1>
      <h2>Appointment Form</h2>
      <AddSlot />
      <h2>Doctors List</h2>
      <DoctorList />
    </div>
  );
}

export default App;
