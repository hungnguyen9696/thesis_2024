import React, { useState, useEffect } from 'react';

const Checkbox = (props) => {
    const { categories, handleFilters } = props;
    const [checked, setChecked] = useState([]);

    const handleToggle = (catId) => () => {
        const indexOfCheckedCate = checked.indexOf(catId);
        //clone an array es6 way
        const ArrayOfCateId = [...checked];

        // if currently checked was not already in checked state > push
        // else pull/take off
        if (indexOfCheckedCate === -1) {
            ArrayOfCateId.push(catId)
        } else {
            ArrayOfCateId.splice(indexOfCheckedCate, 1)
        }
        // console.log(ArrayOfCateId);
        setChecked(ArrayOfCateId);

        handleFilters(ArrayOfCateId);

    }

    return (
        <ul>
            {categories.map((cat, index) => (
                <li key={index} className="list-unstyled">
                    <input
                        onChange={handleToggle(cat._id)}
                        type="checkbox"
                        className="form-check-input"
                        id={`category-${index}`}
                    />
                    <label 
                        className="form-check-label" 
                        htmlFor={`category-${index}`}
                    > 
                        {cat.name}
                    </label>
                </li>
            ))}
        </ul>

    )

}

export default Checkbox;