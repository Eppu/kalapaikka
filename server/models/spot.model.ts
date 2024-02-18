import * as mongoose from 'mongoose';

const fishingSpotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

fishingSpotSchema.index({ coordinates: '2dsphere' });

export const FishingSpot = mongoose.model('FishingSpot', fishingSpotSchema);
