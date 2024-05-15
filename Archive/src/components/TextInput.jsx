import React from 'react';

const TextInput = ({
    type = "text",
    multiline = false,
    rows = 1,
    name,
    label,
    placeholder = "",
    error = "",
    value,
    onChange,
}) => {
    return (
        <div className='flex flex-col gap-2 my-3'>
            <label>{label}</label>
            <input
                className="border rounded-md p-2"
                type={type}
                // multiline={multiline}
                // rows={rows}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
            />
            {
                error &&
                <label className='text-xs text-red-500'>{error}</label>
            }
        </div>
    );
};

export default TextInput;