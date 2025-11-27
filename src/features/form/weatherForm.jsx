import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { fetchWeather } from '../weather/weatherSlice'
import { toast } from 'react-toastify'

export const FormView = ({ onClose }) => {
    const dispatch = useDispatch()

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [errorSearch, setErrorSearch] = useState('');
    const [loadingGeo, setLoadingGeo] = useState(false);
    const [errorGeo, setErrorGeo] = useState('');

    const handleAdd = async (payload) => {
      try {
        await dispatch(fetchWeather(payload)).unwrap();
        onClose();
      } catch (error) {
        toast.error(error);
      }
    };

  const handleSelectPlace = (place) => {
    handleAdd({
      latitude: place.latitude,
      longitude: place.longitude,
      label: `${place.name}${place.country ? ', ' + place.country : ''}`,
    });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }

    setLoadingGeo(true);
    setErrorGeo('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleAdd({
          latitude,
          longitude,
          label: 'Ma position',
        });
        setLoadingGeo(false);
      },
      (error) => {
        setErrorGeo("Impossible de récupérer votre position.");
        setLoadingGeo(false);
        toast.error(error);
      }
    );
  };

  // Auto-complétion
  useEffect(() => {
    // pas de requête si trop court
    if (query.trim().length < 3) {
      setResults([]);
      setErrorSearch('');
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const fetchPlaces = async () => {
      setLoadingSearch(true);
      setErrorSearch('');
      try {
        const res = await axios.get(
          'https://geocoding-api.open-meteo.com/v1/search',
          {
            params: {
              name: query,
              count: 5,
              language: 'fr',
              format: 'json',
            },
            signal: controller.signal,
          }
        );

        if (!cancelled) {
          if (res.data?.results?.length) {
            setResults(res.data.results);
          } else {
            setResults([]);
            setErrorSearch('Aucun résultat trouvé.');
          }
        }
      } catch (error) {
        if (cancelled || axios.isCancel(error)) return;
        console.error(error);
        setErrorSearch('Erreur lors de la recherche.');
      } finally {
        if (!cancelled) {
          setLoadingSearch(false);
        }
      }
    };

    // délai API
    const timeoutId = setTimeout(fetchPlaces, 400);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    if (!errorSearch) return;
    toast.error(errorSearch);
  }, [errorSearch]);

  useEffect(() => {
    if (!errorGeo) return;
    toast.error(errorGeo);
  }, [errorGeo]);


  return (
    <div className="locationForm flex s-col m-row">
      <div className="locationFormAuto w-100 m-w-66">
        <div className="inputField">
          <input id="localisationInput" type="text" placeholder=" " value={query} onChange={(e) => setQuery(e.target.value)} />
          <label for="localisationInput" className="w-100">Ville ou aéroport</label>
          {loadingSearch && (<div className="locationFormInfo"><img src="wind-toy-blue.svg" alt="loading"/></div>)}
        </div>

        {results.length > 0 && (
          <ul className="locationFormResults">
            {results.map((place) => (
              <li key={place.id}>
                <button type="button" onClick={() => handleSelectPlace(place)}>
                  {place.name}
                  {place.admin1 ? ` (${place.admin1})` : ''}
                  {place.country ? ` - ${place.country}` : ''}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="locationFormGeo w-100 m-w-33">
        <button type="button" className="" onClick={handleUseMyLocation} disabled={loadingGeo}>
          {loadingGeo ? 'GeoLocalisation' : 'Utiliser ma position'}
        </button>
      </div>
    </div>
  );
};
