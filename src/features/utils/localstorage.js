const PERSIST_KEY = 'weather_dashboard_state';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(PERSIST_KEY);
    if (!serializedState) return undefined; // Redux utilisera l'initialState
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('loadState error', e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(PERSIST_KEY, serializedState);
  } catch (e) {
    console.error('saveState error', e);
  }
};
