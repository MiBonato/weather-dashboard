import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import { WeatherItem } from './WeatherItem';
import { LoaderFullScreen } from '../utils/LoaderFull';
import { toast } from 'react-toastify';

const QUARTER_INTERVAL = 15 * 60 * 1000;
const REFRESH_OFFSET = 30 * 1000;

export const WeatherView = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.weather);

  const hasInitialFetchRun = useRef(false);

  useEffect(() => {
    if (!data || data.length === 0 || hasInitialFetchRun.current) return;
    hasInitialFetchRun.current = true;

    const toFetch = [...data];

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= toFetch.length) {
        clearInterval(intervalId);
        return;
      }
      dispatch(fetchWeather(toFetch[i]));
      i++;
    }, 1500);

    return () => clearInterval(intervalId);
  }, [data, dispatch]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const refreshAllLocations = () => {
      data.forEach((location) => {
        dispatch(fetchWeather(location));
      });
    };

    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();

    const nextQuarter = Math.ceil(minutes / 15) * 15;
    let deltaMinutes = nextQuarter - minutes;
    if (deltaMinutes === 0) deltaMinutes = 15;

    let delay =
      deltaMinutes * 60 * 1000 - seconds * 1000 - ms + REFRESH_OFFSET;

    if (delay < 0) delay += QUARTER_INTERVAL;

    let intervalId;
    const timeoutId = setTimeout(() => {
      refreshAllLocations();
      intervalId = setInterval(refreshAllLocations, QUARTER_INTERVAL);
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
  }, [error]);

  return (
    <div className="weatherContainer flex">
      {loading && <LoaderFullScreen />}

      {data.length > 0 && (
        <div className="weatherList flex w-100 jc-start">
          {data.map((location) => (
            <WeatherItem key={location.id} location={location} />
          ))}
        </div>
      )}
    </div>
  );
};
