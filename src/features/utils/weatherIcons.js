export function getWeatherIconName(weatherCode, isDay) {
  switch (weatherCode) {
    // Ciel dégagé
    case 0:
      return isDay
        ? { src: 'clear-day', alt: 'Ciel dégagé' }
        : { src: 'clear-night', alt: 'Ciel clair de nuit' };

    // Principalement dégagé
    case 1:
      return isDay
        ? { src: 'partly-cloudy-day', alt: 'Ciel majoritairement dégagé' }
        : { src: 'partly-cloudy-night', alt: 'Ciel majoritairement dégagé de nuit' };

    // Partiellement nuageux
    case 2:
      return isDay
        ? { src: 'overcast-day', alt: 'Partiellement nuageux' }
        : { src: 'overcast-night', alt: 'Partiellement nuageux de nuit' };

    // Couvert
    case 3:
      return { src: 'overcast', alt: 'Ciel couvert' };

    // --- Brouillard ---
      // Brouillard
    case 45:
      return isDay
        ? { src: 'fog-day', alt: 'Brouillard' }
        : { src: 'fog-night', alt: 'Brouillard de nuit' };

    // Brouillard givrant
    case 48:
      return isDay
        ? { src: 'freezing-fog-day', alt: 'Brouillard givrant' }
        : { src: 'freezing-fog-night', alt: 'Brouillard givrant de nuit' };

    // --- Bruine ---
    // Bruine légère
    case 51:
      return { src: 'drizzle-light', alt: 'Bruine légère' };
    // Bruine modérée
    case 53:
      return { src: 'drizzle-moderate', alt: 'Bruine modérée' };
    // Bruine dense / forte
    case 55:
      return { src: 'drizzle', alt: 'Bruine dense' };
    // Bruine verglaçante légère
    case 56:
      return { src: 'drizzle-light-freezing', alt: 'Bruine verglaçante légère' };
    // Bruine verglaçante forte
    case 57:
      return { src: 'drizzle-heavy-freezing', alt: 'Bruine verglaçante forte' };

    // --- Pluie continue ---
    // Pluie légère
    case 61:
      return { src: 'rain-light', alt: 'Pluie légère' };
    // Pluie modérée
    case 63:
      return { src: 'rain-moderate', alt: 'Pluie modérée' };
    // Pluie forte
    case 65:
      return { src: 'rain', alt: 'Pluie forte' };
    // Pluie verglaçante légère
    case 66:
      return { src: 'rain-freezing-light', alt: 'Pluie verglaçante légère' };
    // Pluie verglaçante forte
    case 67:
      return { src: 'rain-freezing-heavy', alt: 'Pluie verglaçante forte' };

    // --- Neige continue / grains de neige ---
    // Neige légère
    case 71:
      return { src: 'snow-light', alt: 'Neige légère' };

    // Neige modérée
    case 73:
      return { src: 'snow-moderate', alt: 'Neige modérée' };

    // Neige forte
    case 75:
      return { src: 'snow', alt: 'Fortes chutes de neige' };

    // Neige roulée / grains de neige
    case 77:
      return { src: 'hail', alt: 'Neige roulée (grésil)' };

    // --- Averses de pluie ---
    // Averses de pluie légères
    case 80:
      return isDay
        ? { src: 'partly-cloudy-day-rain-light', alt: 'Averses de pluie légères' }
        : { src: 'partly-cloudy-night-rain-light', alt: 'Averses de pluie légères de nuit' };

    // Averses de pluie modérées
    case 81:
      return isDay
        ? { src: 'partly-cloudy-day-rain-moderate', alt: 'Averses de pluie modérées' }
        : { src: 'partly-cloudy-night-rain-moderate', alt: 'Averses de pluie modérées de nuit' };

    // Averses de pluie fortes / violentes
    case 82:
      return isDay
        ? { src: 'partly-cloudy-day-rain', alt: 'Averses de pluie fortes' }
        : { src: 'partly-cloudy-night-rain', alt: 'Averses de pluie fortes de nuit' };

    // --- Averses de neige ---
    // Averses de neige légères
    case 85:
      return isDay
        ? { src: 'partly-cloudy-day-snow-moderate', alt: 'Averses de neige légères' }
        : { src: 'partly-cloudy-night-snow-moderate', alt: 'Averses de neige légères de nuit' };

    // Averses de neige fortes
    case 86:
      return isDay
        ? { src: 'partly-cloudy-day-snow', alt: 'Averses de neige fortes' }
        : { src: 'partly-cloudy-night-snow', alt: 'Averses de neige fortes de nuit' };

    // --- Orages ---
    // Orage léger ou modéré, sans info explicite sur la grêle
    case 95:
      return { src: 'thunderstorm', alt: 'Orage' };

    // Orage avec grêle légère ou modérée
    case 96:
      return { src: 'thunderstorm-hail-moderate', alt: 'Orage avec grêle légère' };

    // Orage avec grêle forte
    case 99:
      return { src: 'thunderstorm-hail', alt: 'Orage avec grêle forte' };

    // --- Fallback ---
    default:
      return { src: 'not-available', alt: 'Condition météo inconnue' };
  }
}


