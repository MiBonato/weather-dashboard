const PERSIST_KEY = 'weather_dashboard_state';
const STORAGE_VERSION = "1.02";

/* maj storage pour le dev, toto => remove en fin de dev */
/*
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(PERSIST_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('loadState error', e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(PERSIST_KEY, "version: 1.02",serializedState);
  } catch (e) {
    console.error('saveState error', e);
  }
};
*/

export const loadState = () => {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);

    if (!parsed.version || parsed.version !== STORAGE_VERSION) {
      console.warn("LocalStorage cleared");
      localStorage.removeItem(PERSIST_KEY);
      return undefined;
    }

    return parsed.data;

  } catch (e) {
    console.error("loadState error", e);
    return undefined;
  }
};


export const saveState = (state) => {
  try {
    const saveObject = {
      version: STORAGE_VERSION,
      data: state, // ← l'ancien contenu
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(saveObject));
  } catch (e) {
    console.error("saveState error", e);
  }
};