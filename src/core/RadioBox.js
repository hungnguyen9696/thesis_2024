import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = (props) => {
    const { prices, handleFilters } = props;
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value)
    }

    return (
        prices.map((pri, index) => (
            <div key={index}>
                <input
                    id={index}
                    onChange={handleChange}
                    value={pri._id}
                    name='price'
                    type="radio"
                    className='mr-2 ml-4'
                />
                <label for={index} className='form-check-label'> {pri.name}</label>
            </div>
        ))

    )
}

export default RadioBox;