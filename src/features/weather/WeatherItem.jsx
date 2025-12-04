import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { WeatherDetail } from './WeaverDetail'
import { removeLocation } from './weatherSlice'
import { getTemperatureCategory } from '../utils/temperature'
import { getWeatherIconName } from '../utils/weatherIcons';
import { windSpeedToBeaufort } from '../utils/windforce'

export const WeatherItem = ({ location }) => {
    const dispatch = useDispatch();
    const { id, label, latitude, longitude, weather } = location;
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
    const iconWind = windSpeedToBeaufort(current.windspeed)

    const getNearestPrecipitation = (hourly, date) => {
      const ref = new Date(date).getTime();
        
      let closestIndex = 0;
      let minDiff = Infinity;
        
      hourly.time.forEach((t, i) => {
        const diff = Math.abs(new Date(t).getTime() - ref);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      });
  
      return hourly.precipitation[closestIndex];
    };

    const currentPrecipitation = getNearestPrecipitation(weather.hourly, date);

    return (
        <div className={`weatherItem flex w-100 m-w-50 l-w-33 ` + (isClosing ? 'closing' : '' )}>
            <div className="fadeInFromLeft w-100 flex jc-center ai-center">
                <div className="removeItem w-100" onClick={() => handleRemove(`${latitude},${longitude}`)}><img src="close-x.svg" alt="Fermer" className="close-icon"/></div>
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
                <div className="wind flex s-row jc-center w-100">
                    <div className="predWindSpeed flex w-33 jc-center">
                        <img src={`${iconWind.src}.svg`} alt={`${iconWind.alt}`} />
                        <span>{current.windspeed}km/h</span>
                    </div> 
                    <div className="predWindDirection flex w-33 jc-center">
                        <img src="windsock.svg" alt="windsock" />
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
                    <div className="predRainDrop flex w-33 jc-center">
                        <img src="raindrop-measure.svg" alt="raindrop-measure" />
                        <span>{currentPrecipitation} mm</span>
                    </div>
                </div>
                <div className="weatherDetailContainer">
                    <WeatherDetail hourly={weather.hourly} daily={weather.daily} currentTime= {date}/>
                </div>
            </div>
        </div>
    )
}
