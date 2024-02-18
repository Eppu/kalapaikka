import { FishingSpot } from '../../../models/spot.model';

export default defineEventHandler((event) => {
  const fishingSpots = FishingSpot.find();

  return fishingSpots;
});
