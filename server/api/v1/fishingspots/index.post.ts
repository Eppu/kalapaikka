import { CreatedByType, FishingSpot } from '../../../models/spot.model';
import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }

    // Check if body includes required fields
    if (!body.name || !body.coordinates) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const { name, description, coordinates } = body;

    // Flip coordinates to match GeoJSON format
    const flippedCoordinates = {
      ...coordinates,
      coordinates: [coordinates.coordinates[1], coordinates.coordinates[0]],
    };

    // Reverse geocode to get the province. We use OpenStreetMap's Nominatim API for this.
    // We also set the 'accept-language' parameter to 'fi' to get the response in Finnish.
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat: flippedCoordinates.coordinates[1],
        lon: flippedCoordinates.coordinates[0],
        format: 'json',
        'accept-language': 'fi',
      },
    });

    const province = response.data.address.state || 'Muu';

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
