export function getWindSpeedToBeaufort(speedKmh) {
  if (speedKmh < 1){
    return {src:'wind-beaufort-0', alt:'Vent calme'};
  }
  if (speedKmh < 6){
    return {src:'wind-beaufort-1', alt:'Très légère brise'};
  }
  if (speedKmh < 12){
    return {src:'wind-beaufort-2', alt:'Légère brise'};
  }
  if (speedKmh < 20){
    return {src:'wind-beaufort-3', alt:'Petite brise'};
  }
  if (speedKmh < 29){
    return {src:'wind-beaufort-4', alt:'Jolie brise'};
  }
  if (speedKmh < 39){
    return {src:'wind-beaufort-5', alt:'Bonne brise'};
  }
  if (speedKmh < 50){
    return {src:'wind-beaufort-6', alt:'Vent frais'};
  }
  if (speedKmh < 62){
    return {src:'wind-beaufort-7', alt:'Grand frais'};
  }
  if (speedKmh < 75){
    return {src:'wind-beaufort-8', alt:'Coup de vent'};
  }
  if (speedKmh < 89){
    return {src:'wind-beaufort-9', alt:'Fort coup de vent'};
  }
  if (speedKmh < 103){
    return {src:'wind-beaufort-10', alt:'Tempête'};
  }
  if (speedKmh < 118){
    return {src:'wind-beaufort-11', alt:'Violente tempête'};
  }
  return {src:'wind-beaufort-12', alt:'Ouragan'};
}