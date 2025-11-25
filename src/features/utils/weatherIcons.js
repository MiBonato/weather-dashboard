export function getWeatherIconName(weatherCode, isDay) {
  // Ciel clair
  if (weatherCode === 0) {
    return isDay ? 'clear-day' : 'clear-night';
  }

  // Peu nuageux / partiellement nuageux
  if ([1, 2].includes(weatherCode)) {
    return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
  }

  // Couvert
  if (weatherCode === 3) {
    return 'overcast';
  }

  // Brouillard
  if ([45, 48].includes(weatherCode)) {
    return isDay ? 'fog-day' : 'fog-night';
  }

  // Bruine
  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return 'drizzle';
  }

  // Pluie
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return 'rain';
  }

  // Neige
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return 'snow';
  }

  // Orages
  if ([95, 96, 99].includes(weatherCode)) {
    return 'thunderstorms';
  }

  return 'not-available';
}
