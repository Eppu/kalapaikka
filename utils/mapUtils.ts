export const getZoomOffset = (zoomLevel: number) => {
  switch (zoomLevel) {
    case 6:
      return 0.2;
    case 7:
      return 0.1;
    case 8:
      return 0.05;
    case 9:
      return 0.025;
    case 10:
      return 0.0125;
    case 11:
      return 0.00625;
    case 12:
      return 0.003125;
    case 13:
      return 0.0015625;
    case 14:
      return 0.00078125;
    case 15:
      return 0.000390625;
    case 16:
      return 0.0001953125;
    case 17:
      return 0.00009765625;
    case 18:
      return 0.000048828125;
    default:
      return 0.2;
  }
};
