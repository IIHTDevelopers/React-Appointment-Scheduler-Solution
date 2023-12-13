import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddSlot from '../components/AddSlot';
import axios from 'axios';

jest.mock('axios');

describe('boundary', () => {
    test('AddSlotComponent boundary it is rendered', () => {
        render(<AddSlot />);
        expect(screen.getByRole('heading')).toBeTruthy();
    });

    test('AddSlotComponent boundary it has "Add Available Slot" h2', () => {
        render(<AddSlot />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Add Available Slot');
    });

    test('AddSlotComponent boundary it has doctor select field', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'Dr. John Doe' },
                { id: 2, name: 'Dr. Jane Smith' },
            ],
        });

        render(<AddSlot />);
        const selectDoctor = await screen.findByLabelText('Select Doctor:');
        expect(selectDoctor).toBeTruthy();
    });

    test('AddSlotComponent boundary it has date input field', () => {
        render(<AddSlot />);
        const dateInput = screen.getByLabelText('Date:');
        expect(dateInput).toBeTruthy();
    });

    test('AddSlotComponent boundary it has time input field', () => {
        render(<AddSlot />);
        const timeInput = screen.getByLabelText('Time:');
        expect(timeInput).toBeTruthy();
    });

    test('AddSlotComponent boundary it has an "Add Slot" button', () => {
        render(<AddSlot />);
        const addButton = screen.getByRole('button', { name: 'Add Slot' });
        expect(addButton).toBeTruthy();
    });
});
