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
    const formattedTime = date.substring(11);

    const handleRemove = () => {
      setIsClosing(true);
      setTimeout(() => {
        dispatch(removeLocation(id));
      }, 350);
    };


    const iconTemperature = getTemperatureCategory(current.temperature)
    const iconName = getWeatherIconName(current.weathercode, current.is_day);
    const iconWind = getWindSpeedToBeaufort(current.windspeed)

    const currentUv = getNearestHourlyValue(weather.hourly, 'uv_index', date);
    const iconUvs = getUvIndexLevel(currentUv)

    const currentPrecipitation = getNearestHourlyValue(weather.hourly, 'precipitation', date)

    /* 
    todo : 

    icone defilement scroll
    revision de toutes les icones du temps dans le ciel

    auto remove cookie déprecié
    auto refresh


    modale : système d'onglet pour
    - search
    - localiser moi
    - entrer coordonée (new)
    */

    return (
        <div className={`weatherItem flex w-100 m-w-50 l-w-33 ` + (isClosing ? 'closing' : '' )}>
            <div className="fadeInFromLeft w-100 flex jc-center ai-center">
                <div className="removeItem w-100" onClick={handleRemove}><img src="close-x.svg" alt="Fermer" className="close-icon"/></div>
                <div className="predTime w-100">généré à {formattedTime}</div>
                <div className="predTtitle w-100">{label}</div>
                <div className="predTemp w-100 flex jc-center">
                    <div className="w-100">
                        <img src={`${iconTemperature}.svg`} alt="thermometer" />{current.temperature}°C
                    </div>
                    <div className="currentWeather w-100">
                        <img src={`${iconName}.svg`} alt={iconName} />
                    </div>
                </div>
                <div className="skyInfo flex jc-center w-100">
                    <div className="predWindSpeed flex w-50 jc-center">
                        <img src={`${iconWind.src}.svg`} alt={`${iconWind.alt}`} />
                        <span>{current.windspeed}km/h</span>
                    </div> 
                    <div className="predWindDirection flex w-50 jc-center">
                        <span>Direction</span>
                        <div className="compassContainer">
                            <div className="compass">
                                <span className="north">N</span>
                                <span className="south">S</span>
                                <span className="est">E</span>
                                <span className="west">W</span>
                                <img src="compass.svg" alt="wind direction" className="wind-icon" style={{ transform: `rotate(${current.winddirection}deg)`,transition: "transform 0.3s ease" }}/>
                            </div>
                        </div>
                    </div>
                    <div className="predRainDrop flex w-50 jc-center">
                        <img src="raindrop-measure.svg" alt="raindrop-measure" />
                        <span>{currentPrecipitation} mm</span>
                    </div>
                    <div className="predUvIndex flex w-50 jc-center">
                        {current.is_day ? <><span>Index UV</span><img src={`${iconUvs.src}.svg`} alt={`${iconUvs.alt}`} /></> : <img src="starry-night.svg" alt="Nuit - pas d'UV" /> }
                    </div>
                </div>
                <div className="weatherDetailContainer">
                    <WeatherDetail hourly={weather.hourly} daily={weather.daily} currentTime= {date}/>
                </div>
            </div>
        </div>
    )
}
