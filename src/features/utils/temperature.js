export function getTemperatureCategory(tempC) {
  if (tempC < 4) {
    return 'thermometer-freezing';
  }
  if (tempC < 15) {
    return 'thermometer-cold';
  }
  if (tempC < 30) {
    return 'thermometer';
  }
  if (tempC < 40) {
    return 'thermometer-warm';
  }
  return 'thermometer-heatwave';
}