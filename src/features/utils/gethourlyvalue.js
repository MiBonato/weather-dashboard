export function getNearestHourlyValue(hourly, field, date) {
  const ref = new Date(date).getTime();

  let closestIndex = 0;
  let minDiff = Infinity;

  hourly.time.forEach((t, i) => {
    const diff = Math.abs(new Date(t).getTime() - ref);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  });

  return hourly[field][closestIndex];
}
