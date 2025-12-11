import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import { WeatherItem } from './WeatherItem';
import { LoaderSmallScreen } from '../utils/LoaderSmall';
import { toast } from 'react-toastify';

const QUARTER_INTERVAL = 15 * 60 * 1000;
const REFRESH_OFFSET = 30 * 1000;

export const WeatherView = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.weather);

  const hasInitialFetchRun = useRef(false);
  const itemsRef = useRef({});

  useEffect(() => {
    if (!data || data.length === 0) return;

    const last = data[data.length - 1];
    const node = itemsRef.current[last.id];

    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0 || hasInitialFetchRun.current) return;
    hasInitialFetchRun.current = true;

    data.forEach((loc) => dispatch(fetchWeather(loc)));
  
  // test pour 429
  /*const toFetch = [...data];

    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= toFetch.length) {
        clearInterval(intervalId);
        return;
      }
      dispatch(fetchWeather(toFetch[i]));
      i++;
    }, 1500);

    return () => clearInterval(intervalId);*/
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
      <div className="weatherList flex w-100 jc-start">
        {data.length > 0 && (
           <>
            {data.map((location) => (
              <div
                className="flex w-100 m-w-50 l-w-33"
                key={location.id}
                ref={(el) => {
                  if (el) {
                    itemsRef.current[location.id] = el;
                  } else {
                    delete itemsRef.current[location.id];
                  }
                }}
              >
                <WeatherItem location={location} />
              </div>
            ))}
          </>
        )}
      {loading && <LoaderSmallScreen />}
      </div>
    </div>
  );
};
