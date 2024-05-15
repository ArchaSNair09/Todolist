import React from 'react'

const Button = ({
    type = "button",
    className = '',
    label,
    onClick = () => console.log('click')
}) => {
    return (
        <button
            className={`h-12 px-10 bg-red-500 text-white text-md mt-2 mb-4 rounded-md ${className !== "" ? className : ""}`}
            type={type}
            onClick={() => onClick()}
        >
            {label}
        </button>
    );
};

export default Button;