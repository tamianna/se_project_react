import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
    return (
        <>
            <input type="checkbox" id={"temp-switch-new"} className="toggle__checkbox" />
            <label htmlFor={"temp-switch-new"} className="toggle__label">
                <span className={"toggle__button"}></span>
            </label>
        </>
    )
}

export default ToggleSwitch;