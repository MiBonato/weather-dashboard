export function getUvIndexLevel(uvIndex) {
  const level = Math.ceil(uvIndex);
  if (level <= 1) {
    return { src: 'uv-index-1', alt: 'UV-1: Faible' };
  }
  if (level === 2) {
    return { src: 'uv-index-2', alt: 'UV-2: Faible' };
  }
  if (level === 3) {
    return { src: 'uv-index-3', alt: 'UV-3: Modéré' };
  }
  if (level === 4) {
    return { src: 'uv-index-4', alt: 'UV-4: Modéré' };
  }
  if (level === 5) {
    return { src: 'uv-index-5', alt: 'UV-5: Modéré' };
  }
  if (level === 6) {
    return { src: 'uv-index-6', alt: 'UV-6: Élevé' };
  }
  if (level === 7) {
    return { src: 'uv-index-7', alt: 'UV-7: Élevé' };
  }
  if (level === 8) {
    return { src: 'uv-index-8', alt: 'UV-8: Très élevé' };
  }
  if (level === 9) {
    return { src: 'uv-index-9', alt: 'UV-9: Très élevé' };
  }
  if (level === 10) {
    return { src: 'uv-index-10', alt: 'UV-10: Très élevé' };
  }
  return { src: 'uv-index-11', alt: 'UV-11+: Extrême' };
}
