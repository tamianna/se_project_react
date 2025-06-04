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
          checked={currentTemperatureUnit === 'F'}
          onChange={handleToggleSwitchChange}
        />
        <span className={'toggle-switch__button'}></span>
        <span className='toggle-switch__text toggle-switch__text_F'
          /*className={currentTemperatureUnit === 'F' ? 'active' : 'inactive'}*/
        >
          F
        </span>
        <span className='toggle-switch__text toggle-switch__text_C'
          /*</label>className={currentTemperatureUnit === 'C' ? 'active' : 'inactive'}*/
        >
          C
        </span>
      </label>
    </>
  )
}
