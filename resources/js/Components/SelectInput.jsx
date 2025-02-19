import React from 'react';

export default function SelectInput({ id, name, value, className, onChange, required, children }) {
    return (
        <div className="form-control">
            <select
                id={id}
                name={name}
                value={value}
                className={`select select-bordered ${className}`}
                onChange={onChange}
                required={required}
            >
                {children}
            </select>
        </div>
    );
}