import React from "react";

interface SearchInputProps {
    query: string;
    handleInput: (value: string) => void;
}

const SearchInput = ({ query, handleInput }: SearchInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        handleInput(newValue);
    };

    return (
        <input
            type="text"
            placeholder="Filter..."
            value={query}
            onChange={handleChange} 
            className="flex-1 gray_border h-[42px]"
        />
    );
};

export default SearchInput;
