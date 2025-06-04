import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
    return (
        <>
            <input type="checkbox" id={"tempature-switch-new"} className="toggle__checkbox" />
            <label htmlFor={"tempature-switch-new"} className="toggle__label">
                <span className={"toggle__button"}></span>
            </label>
        </>
    )
}

export default ToggleSwitch;