import React from 'react';

const SwitcherLocation = (props) => (

    <div>
        <select
            name="select"
            value={props.value}
            onChange={(e) => props.handleChange(e)}
            className="select-switcher"
        >
            <option value="cz">CZ</option>
            <option value="en">EN</option>
        </select>
    </div>

);

export default SwitcherLocation;