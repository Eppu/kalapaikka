import * as mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    spotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FishingSpot',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    // createdBy will just be a nickname for now
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Comment = mongoose.model('Comment', commentSchema);
