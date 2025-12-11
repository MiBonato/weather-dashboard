import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { fetchWeather } from '../weather/weatherSlice'
import { MapLocationPicker } from './MapLocationPicker'
import { toast } from 'react-toastify'

const TABS = {
  SEARCH: 'search',
  GEO: 'geo',
  MAP: 'map',
};

export const FormView = ({ onClose }) => {
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState(TABS.SEARCH);

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
    <div className="locationForm flex s-col">
      <div className="tabs flex s-row w-100">
        {/* Onglet 1 : auto-complétion */}
        <button
          type="button"
          className={`tab ${activeTab === TABS.SEARCH ? 'tab--active' : ''}`}
          onClick={() => setActiveTab(TABS.SEARCH)}
        >
          Recherche un lieu
        </button>
        {/* Onglet 2 : “Utiliser ma position” */}
        <button
          type="button"
          className={`tab ${activeTab === TABS.GEO ? 'tab--active' : ''}`}
          onClick={() => setActiveTab(TABS.GEO)}
        >
          Localiser ma position
        </button>
        {/* Onglet 3 : Carte */}
        <button
          type="button"
          className={`tab ${activeTab === TABS.MAP ? 'tab--active' : ''}`}
          onClick={() => setActiveTab(TABS.MAP)}
        >
          Rechercher sur carte
        </button>
      </div>

      <div className="tabContent">
        {/* Onglet 1 : auto-complétion */}
        {activeTab === TABS.SEARCH && (
          <div className="locationFormAuto flex s-col w-100">
            <div className="inputField">
              <input
                id="localisationInput"
                type="text"
                placeholder=" "
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <label htmlFor="localisationInput" className="w-100">
                Ville ou aéroport
              </label>
              {loadingSearch && (
                <div className="locationFormInfo">
                  <img src="wind-toy-blue.svg" alt="loading" />
                </div>
              )}
            </div>
            {results.length > 0 && (
              <ul className="locationFormResults">
                {results.map((place) => (
                  <li key={place.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectPlace(place)}
                    >
                      {place.name}
                      {place.admin1 ? ` (${place.admin1})` : ''}
                      {place.country ? ` - ${place.country}` : ''}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Onglet 2 : “Utiliser ma position” */}
        {activeTab === TABS.GEO && (
          <div className="locationGeo flex s-col jc-center ai-center">
            <p>
              Lorsque vous cliquez sur “Utiliser ma position”, votre navigateur vous demande l’autorisation de partager votre emplacement. Il suffit d’accepter pour que nous puissions récupérer votre latitude et votre longitude et afficher la météo correspondant à votre localisation.
            </p>
            <p>
              Pour vous localiser automatiquement, votre appareil utilise les informations fournies par votre navigateur : GPS, Wi-Fi ou réseau mobile selon vos réglages. 
            </p>
            <p>
              Aucune donnée personnelle n’est stockée : la position sert uniquement le temps de récupérer la météo.
            </p>
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={loadingGeo}
            >
              {loadingGeo ? 'Géolocalisation en cours…' : 'Utiliser ma position'}
            </button>
          </div>
        )}

        {/* Onglet 3 : Carte */}
        {activeTab === TABS.MAP && (
          <div className="locationMap">
            <MapLocationPicker
              onConfirm={(payload) => {
                handleAdd(payload);
              }}
            />
          </div>
        )}
      </div>



    </div>
  );
};
