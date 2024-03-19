import { FishingSpot } from '../../../../models/spot.model';

interface FishingSpot {
  name: string;
  description?: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
  createdBy: string;
}

export default defineEventHandler(async (event) => {
  const fishingSpots = (await FishingSpot.find()) as FishingSpot[];

  // // Flip the coordinates back to the format the client expects
  // fishingSpots.forEach((spot) => {
  //   spot.coordinates.coordinates = [spot.coordinates.coordinates[1], spot.coordinates.coordinates[0]];
  // });

  return fishingSpots;
});
