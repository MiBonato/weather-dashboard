import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weather/weatherSlice'
import { loadState, saveState } from '../features/utils/localstorage'

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
    preloadedState,
})

store.subscribe(() => {
  const state = store.getState();
  saveState({
    weather: state.weather,
  });
});

export default store