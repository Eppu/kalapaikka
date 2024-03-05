import { Comment } from '~/server/models/comment.model';

export default defineEventHandler(async (event) => {
  // Only accept GET requests
  if (event.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const spotId = getRouterParam(event, 'spotId');

  if (!spotId) {
    return new Response('Missing spotId', { status: 400 });
  }

  let comments = [];
  // Get the comments for the spot
  try {
    comments = await Comment.find({ spotId });
  } catch (error) {
    console.error('Error getting comments:', error);
    return new Response('Internal Server Error', { status: 500 });
  }

  return new Response(JSON.stringify(comments), { status: 200 });
});
