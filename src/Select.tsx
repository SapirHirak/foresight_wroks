import React, { useState, useEffect } from 'react';

interface Option {
    label: string;
    value: any;
}

interface SelectProps {
    options: Option[];
    isMulti?: boolean;
    placeholder?: string;
    onChange?: (selected: any | any[]) => void;
}

const Select: React.FC<SelectProps> = ({ options, isMulti = false, placeholder = 'Select...', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleSelect = (option: Option) => {
        if (isMulti) {
            if (selectedOptions.includes(option.value)) {
                setSelectedOptions(prev => prev.filter(o => o !== option.value));
            } else {
                setSelectedOptions(prev => [...prev, option.value]);
            }
        } else {
            setSelectedOptions([option.value]);
            setIsOpen(false);
        }
    };

    const handleSelectAll = () => {
        if (selectedOptions.length === options.length) {
            setSelectedOptions([]);
        } else {
            setSelectedOptions(options.map(option => option.value));
        }
    };

    useEffect(() => {
        onChange?.(isMulti ? selectedOptions : selectedOptions[0]);
    }, [selectedOptions, isMulti, onChange]);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="select-container">
            <div className="select-input" onClick={toggleDropdown}>
                {selectedOptions.length > 0
                    ? isMulti
                        ? `${selectedOptions.length} selected`
                        : options.find(option => option.value === selectedOptions[0])?.label
                    : placeholder}
            </div>
            {isOpen && (
                <div className="select-dropdown">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {isMulti && (
                        <div className="select-all">
                            <input
                                type="checkbox"
                                checked={selectedOptions.length === options.length}
                                onChange={handleSelectAll}
                            />
                            <span>Select/Deselect All</span>
                        </div>
                    )}
                    <ul>
                        {filteredOptions.map(option => (
                            <li key={option.value}>
                                {isMulti && (
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => handleSelect(option)}
                                    />
                                )}
                                <span onClick={() => handleSelect(option)}>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Select;
