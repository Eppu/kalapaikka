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
  try {
    const fishingSpots = (await FishingSpot.find()) as FishingSpot[];
    return new Response(JSON.stringify(fishingSpots), { status: 200 });
  } catch (error) {
    console.error('Error getting fishing spots:', error);
    throw createError({ statusCode: 500, message: 'Failed to get fishing spots' });
  }
});
