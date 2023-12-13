import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSlot = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [newSlot, setNewSlot] = useState({
        date: '',
        time: '',
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleInputChange = (e) => {
        setNewSlot({ ...newSlot, [e.target.name]: e.target.value });
    };

    const handleDoctorSelect = (e) => {
        setSelectedDoctor(e.target.value);
    };

    const handleAddSlot = async () => {
        if (!selectedDoctor) {
            alert('Please select a doctor.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/doctors/${selectedDoctor}`);
            const doctorData = response.data;
            const updatedSlots = [
                ...doctorData.availableSlots,
                {
                    id: doctorData.availableSlots.length + 1,
                    date: newSlot.date,
                    time: newSlot.time,
                },
            ];
            await axios.put(`http://localhost:4000/doctors/${selectedDoctor}`, {
                ...doctorData,
                availableSlots: updatedSlots,
            });
        } catch (error) {
            console.error('Error adding slot:', error);
        }
    };

    return (
        <div>
            <h2>Add Available Slot</h2>
            <label htmlFor="doctor">Select Doctor: </label>
            <select id="doctor" value={selectedDoctor} onChange={handleDoctorSelect}>
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                    </option>
                ))}
            </select>
            <br />
            <label htmlFor="date">Date: </label>
            <input id="date" type="date" name="date" value={newSlot.date} onChange={handleInputChange} />
            <br />
            <label htmlFor="time">Time: </label>
            <input id="time" type="text" name="time" value={newSlot.time} onChange={handleInputChange} />
            <br />
            <button onClick={handleAddSlot} disabled={!selectedDoctor}>
                Add Slot
            </button>
        </div>
    );
};

export default AddSlot;
