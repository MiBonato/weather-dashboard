import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weather/weatherSlice'
import { loadState, saveState } from './localstorage'

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
    preloadedState,
})

store.subscribe(() => {
  const state = store.getState();
  const { weather } = state;
  const minimalWeather = {
    ...weather,
    data: weather.data.map((loc) => ({
      id: loc.id,
      label: loc.label,
      latitude: loc.latitude,
      longitude: loc.longitude,
    })),
  };
  saveState({
    weather: minimalWeather,
  });
});

export default store