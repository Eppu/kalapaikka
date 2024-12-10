export const getZoomOffset = (zoomLevel: number) => {
  const maxZoomLevel = 18;
  const minZoomLevel = 6;
  const maxOffset = 2;
  const minOffset = 0.00048828125;

  if (zoomLevel < minZoomLevel) {
    return maxOffset;
  } else if (zoomLevel > maxZoomLevel) {
    return minOffset;
  } else {
    const scale = (zoomLevel - minZoomLevel) / (maxZoomLevel - minZoomLevel);
    const offset = maxOffset * Math.pow(minOffset / maxOffset, scale);
    return offset;
  }
};
