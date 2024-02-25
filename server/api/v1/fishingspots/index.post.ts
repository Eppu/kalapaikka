import { FishingSpot } from '../../../models/spot.model';

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

    const { name, description, coordinates } = body;

    const createdBy = 'Sovelluksen käyttäjä';

    const newFishingSpot = new FishingSpot({
      name,
      description,
      coordinates,
      createdBy,
    });

    console.log('newFishingSpot:', newFishingSpot);

    const savedSpot = await newFishingSpot.save();

    return {
      statusCode: 201,
      body: JSON.stringify(savedSpot),
    };
  } catch (error) {
    console.error('Error creating fishing spot:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
});
