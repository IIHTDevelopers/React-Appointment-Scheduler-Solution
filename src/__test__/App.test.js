import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

describe('boundary', () => {
    test('AppComponent boundary renders without crashing', () => {
        render(<App />);
    });

    test('AppComponent boundary has "Doctor Appointment Scheduler" h2', () => {
        render(<App />);
        expect(screen.queryByText('Doctor Appointment Scheduler')).toBeInTheDocument();
    });

    test('AppComponent boundary has "Appointment Form" h2', () => {
        render(<App />);
        expect(screen.queryByText('Appointment Form')).toBeInTheDocument();
    });

    test('AppComponent boundary has "Doctors List" h2', () => {
        render(<App />);
        expect(screen.queryByText('Doctors List')).toBeInTheDocument();
    });
});
