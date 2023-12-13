import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>List of Doctors and Their Available Slots</h2>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        <h3>{doctor.name}</h3>
                        <p>Specialization: {doctor.specialization}</p>
                        <ul>
                            {doctor.availableSlots.map((slot) => (
                                <li key={slot.id}>
                                    Date: {slot.date}, Time: {slot.time}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
