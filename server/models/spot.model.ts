import * as mongoose from 'mongoose';

export enum CreatedByType {
  USER = 'user',
  ADMIN = 'admin',
}

export enum Province {
  AHVENANMAA = 'Ahvenanmaan maakunta',
  ETELÄ_KARJALA = 'Etelä-Karjala',
  ETELÄ_POHJANMAA = 'Etelä-Pohjanmaa',
  ETELÄ_SAVO = 'Etelä-Savo',
  KAINUU = 'Kainuu',
  KANTA_HÄME = 'Kanta-Häme',
  KESKI_POHJANMAA = 'Keski-Pohjanmaa',
  KESKI_SUOMI = 'Keski-Suomi',
  KYMENLAAKSO = 'Kymenlaakso',
  LAPPI = 'Lappi',
  PIRKANMAA = 'Pirkanmaa',
  POHJANMAA = 'Pohjanmaa',
  POHJOIS_KARJALA = 'Pohjois-Karjala',
  POHJOIS_POHJANMAA = 'Pohjois-Pohjanmaa',
  POHJOIS_SAVO = 'Pohjois-Savo',
  PÄIJAT_HÄME = 'Päijät-Häme',
  SATAKUNTA = 'Satakunta',
  UUSIMAA = 'Uusimaa',
  VARSINAIS_SUOMI = 'Varsinais-Suomi',
  MUU = 'Muu',
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
    province: {
      type: String,
      // enum: Object.values(Province),
      required: true,
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
