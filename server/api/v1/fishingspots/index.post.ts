import { CreatedByType, FishingSpot } from '../../../models/spot.model';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    console.log('body:', body);

    // Check if body includes required fields
    if (!body.name || !body.coordinates) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const { name, description, coordinates, province } = body;

    // Flip coordinates to match GeoJSON format
    const flippedCoordinates = {
      ...coordinates,
      coordinates: [coordinates.coordinates[1], coordinates.coordinates[0]],
    };

    const createdBy = CreatedByType.USER;

    const newFishingSpot = new FishingSpot({
      name,
      description,
      coordinates: flippedCoordinates,
      province,
      createdBy,
    });

    const savedSpot = await newFishingSpot.save();

    console.log('Successfully created a new spot', savedSpot);

    return {
      statusCode: 201,
      body: savedSpot,
    };
  } catch (error) {
    console.error('Error creating fishing spot:', error);
    return {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    };
  }
});
