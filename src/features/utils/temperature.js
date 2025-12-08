export function getTemperatureCategory(tempC) {
  if (tempC < 4) {
    return { src: 'thermometer-freezing', alt: 'gel' };
  }
  if (tempC < 15) {
    return { src: 'thermometer-cold', alt: 'froid' };
  }
  if (tempC < 30) {
    return { src: 'thermometer', alt: 'modéré' };
  }
  if (tempC < 40) {
    return { src: 'thermometer-warm', alt: 'chaud' };
  }
  return { src: 'thermometer-heatwave', alt: 'canicule' };
}
