import { FishingSpot } from '../models/spot.model';

// export default defineEventHandler(async (event) => {
//   // This is a one-time use route handler, that will flip the coordinates of all fishing spots in the database.
//   // It's only used to fix the coordinates of the fishing spots that were saved in the wrong format.

//   const spotsToUpdate = await FishingSpot.find();

//   spotsToUpdate.map(async (spot) => {
//     const flippedCoordinates = {
//       ...spot.coordinates,
//       coordinates: [spot.coordinates.coordinates[1], spot.coordinates.coordinates[0]],
//     };

//     console.log(
//       'Updating spot: ',
//       spot.name,
//       'with coordinates: ',
//       flippedCoordinates.coordinates,
//       'from: ',
//       spot.coordinates.coordinates,
//       'to: ',
//       flippedCoordinates.coordinates,
//     );

//     await FishingSpot.findByIdAndUpdate(spot._id, { coordinates: flippedCoordinates });
//   });
// });
