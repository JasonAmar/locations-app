import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  imageUrl: { type: String, require: true },
  address: { type: String, require: true },
  coordinates: {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
  },
  creatorId: { type: String, require: true },
});

export default mongoose.model('Place', placeSchema);
