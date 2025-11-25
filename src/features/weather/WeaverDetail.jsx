import React from 'react'
import { getWeatherIconName } from '../utils/weatherIcons';

export const WeatherDetail = ({ hourly, daily, currentTime}) => {
    if (!hourly || !hourly.time) {
        return <div className="">Aucune prévision disponible.</div>;
    }

    const referenceDate = new Date(currentTime);
    const nextFullHour = new Date(referenceDate);
    nextFullHour.setMinutes(0, 0, 0);
    if (referenceDate.getMinutes() > 0) {
        nextFullHour.setHours(nextFullHour.getHours() + 1);
    }

    let startIndex = hourly.time.findIndex(t => {
        const date = new Date(t);
        return date.getTime() === nextFullHour.getTime();
    });
    
    if (startIndex === -1) {
      startIndex = 0;
    }

    const data24h = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => {
        const globalIndex = startIndex + index;
        return {
            time,
            temperature: hourly.temperature_2m[globalIndex],
            weathercode: hourly.weathercode[globalIndex],
            windspeed: hourly.windspeed_10m[globalIndex],
            precipitation: hourly.precipitation[globalIndex],
            cloudcover: hourly.cloudcover[globalIndex],
            isDay: hourly.is_day[globalIndex],
        };
    });

    const sunrise = daily.sunrise[0].substring(11)
    const sunriseHour = daily.sunrise[0].substring(11, 13)
    const sunset = daily.sunset[0].substring(11)
    const sunsetHour = daily.sunset[0].substring(11, 13)

    return (
        <div className="weatherDetail">
            {data24h.map((data, index) => {
                const iconName = getWeatherIconName(data.weathercode, data.isDay);
                const formattedTime = data.time.substring(11);
                const currentHour = data.time.substring(11,13);
                return (
                    <React.Fragment key={index + data.time}>
                    <div>
                        <div className="timeStamp">{formattedTime}</div>
                        <div className="weatherDetailMain">
                            <img
                            src={`/${iconName}.svg`}
                            alt={iconName}
                            width="48"
                            height="48"
                            />
                        </div>
                        <div className="weatherDetailHours flex s-col">
                            <div className="w-100 flex s-row jc-center">
                                <div className="w-50 flex jc-end">
                                    <img src="thermometer.svg" alt="temperature" width="30" height="30" />
                                </div>
                                <div className="w-50">{data.temperature}°C</div>
                            </div>
                            <div className="w-100 flex s-row jc-center">
                                <div className="w-50 flex jc-end">
                                    <img src="wind.svg" alt="wind" width="30" height="30" />
                                </div>
                                <div className="w-50">{data.windspeed} km/h</div>
                            </div>
                            <div className="w-100 flex s-row jc-center">
                                <div className="w-50 flex jc-end">
                                    <img src="raindrop-measure.svg" alt="raindrop-measure" width="30" height="30" />
                                </div>
                                <div className="w-50">{data.precipitation} mm</div>
                            </div>
                            <div className="w-100 flex s-row jc-center">
                                <div className="w-50 flex jc-end">
                                    <img src="cloudy.svg" alt="cloudy" width="30" height="30" />
                                </div>
                                <div className="w-50">{data.cloudcover}%</div>
                            </div>
                        </div>
                    </div>
                    
                    {currentHour === sunriseHour && (
                        <div key={sunrise}>
                            <div className="timeStamp">{sunrise}</div>
                            <div className="weatherDetailMain">
                                <img
                                src={`sunrise.svg`}
                                alt={iconName}
                                width="48"
                                height="48"
                                />
                            </div>
                            <div className="weatherDetailHours sunrise flex s-col">
                                <div className="arrow">
                                    <img
                                    src={`pressure-high-arrows.svg`}
                                    alt="pressure-high-arrows"
                                    width="48"
                                    height="48"
                                    />
                                </div>
                                <div>lever</div>
                            </div>
                        </div>
                    )}
                    {currentHour === sunsetHour && (
                        <div key={sunset}>
                            <div className="timeStamp">{sunset}</div>
                            <div className="weatherDetailMain">
                                <img
                                src={`sunset.svg`}
                                alt="sunset"
                                width="48"
                                height="48"
                                />
                            </div>
                            <div className="weatherDetailHours sunset flex s-col">
                                <div className="arrow">
                                    <img
                                    src={`pressure-low-arrows.svg`}
                                    alt="pressure-low-arrows"
                                    width="48"
                                    height="48"
                                    />
                                </div>
                                <div>coucher</div>
                            </div>
                        </div>
                    )}
                    </React.Fragment>
                );
            })}
        </div>
    )
}
