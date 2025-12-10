import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { WeatherDetail } from './WeaverDetail'
import { removeLocation } from './weatherSlice'
import { getTemperatureCategory } from '../utils/temperature'
import { getWeatherIconName } from '../utils/weatherIcons'
import { getWindSpeedToBeaufort } from '../utils/windforce'
import { getUvIndexLevel } from '../utils/uvindex'
import { getNearestHourlyValue } from '../utils/gethourlyvalue'

export const WeatherItem = ({ location }) => {
    const dispatch = useDispatch();
    const { id, label, weather } = location;
    const [isClosing, setIsClosing] = useState(false);
    // securité rechargement state vide
    if (!weather || !weather.current_weather || !weather.hourly) {
        return (
            <></>
        )
    }

    const current = weather.current_weather;
    const date = current.time;

    const handleRemove = () => {
      setIsClosing(true);
      setTimeout(() => {
        dispatch(removeLocation(id));
      }, 350);
    };


    const iconTemperature = getTemperatureCategory(current.temperature);
    const apparentTemp = weather.hourly.apparent_temperature[0];
    const maxTemp = weather.daily.temperature_2m_max[0];
    const minTemp = weather.daily.temperature_2m_min[0];
    const iconName = getWeatherIconName(current.weathercode, current.is_day);
    const iconWind = getWindSpeedToBeaufort(current.windspeed)
    const currentUv = getNearestHourlyValue(weather.hourly, 'uv_index', date);
    const iconUvs = getUvIndexLevel(currentUv)
    const currentPrecipitation = getNearestHourlyValue(weather.hourly, 'precipitation', date)

    /* 
    todo : 

    fixer responsive section du milieu
    background

    modale : système d'onglet pour
    - search
    - localiser moi
    - entrer coordonée (new)
    */

    return (
        <div className={`weatherItem flex w-100 m-w-50 l-w-33 ` + (isClosing ? 'closing' : '' )}>
            <div className="fadeInFromLeft w-100 flex jc-center ai-center">
                <div className="removeItem w-100" onClick={handleRemove}><img src="close-x.svg" alt="Fermer" className="close-icon"/></div>
                <div className="predTtitle w-100">{label}</div>
                <div className="predTemp w-100 flex jc-center">
                    <div className="flex s-col jc-center ai-center w-100 ">
                        <div className="mainInfo w-100 ">
                            <img src={`${iconTemperature.src}.svg`} alt={`${iconTemperature.alt}`} />{current.temperature}°C
                        </div>
                        <div className="subInfo flex s-col w-100 ">
                            <div className="flex w-100 ">T° ressentie {apparentTemp}°C</div>
                            <div className="flex r-col jc-between w-100 ">
                                <div>
                                    <img src="arrow-up.svg" alt="temperature maximale" /> {maxTemp}°C 
                                </div>
                                <div>
                                    <img src="arrow-down.svg" alt="temperature minimale" /> {minTemp}°C
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="currentWeather w-100">
                        <img src={`${iconName.src}.svg`} alt={iconName.alt} />
                    </div>
                </div>
                <div className="skyInfo flex s-row jc-center w-100">
                    <div className="predWindSpeed flex w-33 jc-center">
                        <img src={`${iconWind.src}.svg`} alt={`${iconWind.alt}`} />
                        <span>{current.windspeed}km/h</span>
                        <div className="predWindDirection flex jc-center">
                            <img src="compass.svg" alt="wind direction" className="wind-icon" style={{ transform: `rotate(${current.winddirection}deg)`}}/>
                        </div>
                    </div> 
                    <div className="predRainDrop flex w-33 jc-center">
                        <img src="raindrop.svg" alt="raindrop" />
                        <span>{currentPrecipitation} mm</span>
                    </div>
                    <div className="predUvIndex flex w-33 jc-center">
                        {current.is_day ? <><span>UV</span><img src={`${iconUvs.src}.svg`} alt={`${iconUvs.alt}`} /></> : <img src="starry-night.svg" alt="Nuit - pas d'UV" /> }
                    </div>
                </div>
                <div className="weatherDetailContainer">
                    <WeatherDetail hourly={weather.hourly} daily={weather.daily} currentTime= {date}/>
                </div>
            </div>
        </div>
    )
}
