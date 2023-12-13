// DoctorList.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DoctorList from '../components/DoctorList';
import axios from 'axios';

jest.mock('axios');

describe('boundary', () => {
    test('DoctorListComponent boundary it is rendered', () => {
        render(<DoctorList />);
        expect(screen.getByRole('heading')).toBeTruthy();
    });

    test('DoctorListComponent boundary it has "List of Doctors and Their Available Slots" h2', () => {
        render(<DoctorList />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('List of Doctors and Their Available Slots');
    });

    test('DoctorListComponent boundary it displays doctor names', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', availableSlots: [] },
                { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist', availableSlots: [] },
            ],
        });

        render(<DoctorList />);
        const doctorNames = await screen.findAllByRole('heading', { level: 3 });
        expect(doctorNames).toHaveLength(2);
    });

    test('DoctorListComponent boundary it displays doctor specialization', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', availableSlots: [] },
                { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist', availableSlots: [] },
            ],
        });

        render(<DoctorList />);
        const doctorSpecializations = await screen.findAllByText(/Specialization:/i);
        expect(doctorSpecializations).toHaveLength(2);
    });

    test('DoctorListComponent boundary it displays available slots of doctors', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    name: 'Dr. John Doe',
                    specialization: 'Cardiologist',
                    availableSlots: [
                        { id: 1, date: '2023-11-15', time: '09:00 AM - 11:00 AM' },
                        { id: 2, date: '2023-11-15', time: '01:00 PM - 03:00 PM' },
                    ],
                },
                {
                    id: 2,
                    name: 'Dr. Jane Smith',
                    specialization: 'Dermatologist',
                    availableSlots: [
                        { id: 1, date: '2023-11-16', time: '10:00 AM - 12:00 PM' },
                        { id: 2, date: '2023-11-16', time: '03:00 PM - 05:00 PM' },
                    ],
                },
            ],
        });

        render(<DoctorList />);
        const doctorSlots = await screen.findAllByRole('listitem');
        expect(doctorSlots).toHaveLength(6);
    });
});
