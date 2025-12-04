import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather } from './weatherSlice'
import { WeatherItem } from './WeatherItem'
import { LoaderFullScreen } from '../utils/LoaderFull'
import { toast } from 'react-toastify'

export const WeatherView = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.weather)

    const initialFetchDone = useRef(false);

    useEffect(() => {
      if (!data || data.length === 0 || initialFetchDone.current) return;
      initialFetchDone.current = true;

      data.forEach((loc) => {
        dispatch(fetchWeather(loc));
      });
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
