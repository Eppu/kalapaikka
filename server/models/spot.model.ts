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
      required: true,
    },
  },
  { timestamps: true },
);

fishingSpotSchema.index({ coordinates: '2dsphere' });

const FishingSpot = mongoose.model('FishingSpot', fishingSpotSchema);

module.exports = FishingSpot;
