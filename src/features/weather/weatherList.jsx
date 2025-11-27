import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather } from './weatherSlice'
import { WeatherItem } from './WeatherItem'
import { LoaderFullScreen } from '../utils/LoaderFull'
import { toast } from 'react-toastify'

const QUARTER_INTERVAL = 15 * 60 * 1000;
const REFRESH_OFFSET = 60 * 1000;

export const WeatherView = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.weather)

    useEffect(() => {
      const refreshAllLocations = () => {
        data.forEach((location) => {
          if (!location.latitude || !location.longitude) return;

          dispatch(
            fetchWeather({
              latitude: location.latitude,
              longitude: location.longitude,
              label: location.label,
              id: location.id,
            })
          );
        });
      };

      refreshAllLocations();


      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ms = now.getMilliseconds();

      const quarterIndex = Math.floor(minutes / 15) + 1;
      const nextQuarterMinute = (quarterIndex * 15) % 60;

      let deltaMinutes = nextQuarterMinute - minutes;
      if (deltaMinutes <= 0) {
        // sécurité au cas où on passe l’heure
        deltaMinutes += 60;
      }

      let delay =
        deltaMinutes * 60 * 1000 - seconds * 1000 - ms + REFRESH_OFFSET;

      // sécurité : si jamais on tombe négatif, on pousse d’un cycle complet
      if (delay < 0) {
        delay += QUARTER_INTERVAL;
      }

      let intervalId;
      const timeoutId = setTimeout(() => {
        refreshAllLocations();

        intervalId = setInterval(() => {
          refreshAllLocations();
        }, QUARTER_INTERVAL);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    }, [data, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error])

    return (
        <div className="weatherContainer flex">
            {loading && <LoaderFullScreen /> }

            {data.length > 0 && (
                <div className="weatherList flex w-100 jc-start">
                    {data.map((location) => (
                        <WeatherItem key={location.id} location={location} />
                    ))}
                </div>
            )}
        </div>
    )
}
