import * as mongoose from 'mongoose';

export enum CreatedByType {
  USER = 'user',
  ADMIN = 'admin',
}

const fishingSpotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      type: String,
      enum: [CreatedByType.USER, CreatedByType.ADMIN],
      required: true,
    },
  },
  { timestamps: true },
);

fishingSpotSchema.index({ coordinates: '2dsphere' });

export const FishingSpot = mongoose.model('FishingSpot', fishingSpotSchema);
