export function getCloudCover(percent, isDay) {
  if (percent < 20){
    return { src:isDay ? 'clear-day' : 'clear-night' , alt:'ciel clair'};
  }
  if (percent < 50){
    return {src:isDay ? 'partly-cloudy-day' : 'partly-cloudy-night' , alt:'nuages légers'};
  }
  if (percent < 80){
    return {src:isDay ? 'overcast-day' : 'overcast-night' , alt:'ciel nuageux'};
  }
  return {src:'overcast', alt:'ciel couvert'};
}