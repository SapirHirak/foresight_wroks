import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../Select';

describe('Select component', () => {
    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
    ];

    test('renders with placeholder when no options are selected', () => {
        render(<Select options={options} placeholder="Select options" />);
        expect(screen.getByText('Select options')).toBeInTheDocument();
    });

    test('opens dropdown on click', () => {
        render(<Select options={options} placeholder="Select options" />);
        fireEvent.click(screen.getByText('Select options'));
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    test('selects an option when clicked', () => {
        render(<Select options={options} placeholder="Select options" />);
        fireEvent.click(screen.getByText('Select options'));
        fireEvent.click(screen.getByText('Option 1'));
        expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    test('handles multiple selections with checkboxes', () => {
        render(<Select options={options} isMulti placeholder="Select options" />);
        fireEvent.click(screen.getByText('Select options'));
        fireEvent.click(screen.getByText('Option 1'));
        fireEvent.click(screen.getByText('Option 2'));
        expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    test('filters options based on search input', () => {
        render(<Select options={options} placeholder="Select options" />);
        fireEvent.click(screen.getByText('Select options'));
        fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Option 1' } });
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });

});
