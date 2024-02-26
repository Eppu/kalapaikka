import { Comment } from '~/server/models/comment.model';

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
    if (!body.spotId || !body.text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const { spotId, text, createdBy } = body;

    const newComment = new Comment({
      spotId,
      text,
      createdBy,
    });

    const savedComment = await newComment.save();

    return {
      statusCode: 201,
      body: JSON.stringify(savedComment),
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
});
