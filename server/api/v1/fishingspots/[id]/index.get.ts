import { FishingSpot } from '~/server/models/spot.model';
import { Comment } from '~/server/models/comment.model';

export default defineEventHandler(async (event) => {
  // Only accept GET requests
  if (event.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const id = getRouterParam(event, 'id');

  if (!id) {
    return new Response('Missing spotId', { status: 400 });
  }

  let spot = null;
  let comments = [];
  // Get the spot
  try {
    spot = await FishingSpot.findById(id);
    // throw new Error('Test error');
  } catch (error) {
    console.error('Error getting spot:', error);
    // if (error.name === 'MongoNetworkError' || error.message.includes('timed out')) {
    //   return new Response('Database connection error. Please try again later.', { status: 503 });
    // }
    return new Response('Internal Server Error', { status: 500 });
  }

  if (!spot) {
    return new Response('Spot not found', { status: 404 });
  }

  // Get the comments for the spot, sorted by date
  try {
    comments = await Comment.find({ spotId: id }).sort({ createdAt: -1 }).exec();
  } catch (error) {
    console.error('Error getting comments:', error);
    // if (error.name === 'MongoNetworkError' || error.message.includes('timed out')) {
    //   return new Response('Database connection error. Please try again later.', { status: 503 });
    // }
    return new Response('Internal Server Error', { status: 500 });
  }

  return new Response(JSON.stringify({ spot, comments }), { status: 200 });
});
