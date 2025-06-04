import React, { useContext } from 'react'
import './ToggleSwitch.css'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnit.jsx'

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  )

  return (
    <>
      <label className="toggle-switch">
        <input
          type="checkbox"
          id={'temp-switch-new'}
          className="toggle-switch__checkbox"
          checked={currentTemperatureUnit === "F"}
          onChange={handleToggleSwitchChange}
        />
        <span className={'toggle-switch__button'}></span>
        <span className={`toggle-switch__text toggle-switch__text_F ${
            currentTemperatureUnit === "F"
            ? "toggle-switch__text_active"
            : ""
        }`}
        >
          F
        </span>
        <span className={`toggle-switch__text toggle-switch__text_C ${
            currentTemperatureUnit === "C"
            ? "toggle-switch__text_active"
            : ""
        }`}
        >
          C
        </span>
      </label>
    </>
  )
}
