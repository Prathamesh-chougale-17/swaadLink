import mongoose, { Schema, Document } from 'mongoose';

interface IChef extends Document {
  name: string;
  categories: string[];
  bio: string;
  coverImage: string;
  price: number;
  location: string;
  specialDishes: string[];
  experience: number;
  rating: number;
  languages: string[];
  image: string;
  monthlyFare: number;
  awards: string[];
  trialCharges: number;
  status: "active" | "unavailable";
  canTakePartyOrders: boolean;
  extraPersonCharges: number;
  joinDate: string;
  coordinates: { lat: number; lng: number };
  availability: {
    [key: string]: string[];
  };
  bookings: number;
  satisfactionRate: number;
  totalReviews: number;
}

const ChefSchema: Schema = new Schema({
  name: { type: String, required: true },
  categories: { type: [String], required: true },
  bio: { type: String, required: true },
  coverImage: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  specialDishes: { type: [String], required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true },
  languages: { type: [String], required: true },
  image: { type: String, required: true },
  monthlyFare: { type: Number, required: true },
  extraPersonCharges: { type: Number, required: true },
  awards: { type: [String], required: true },
  trialCharges: { type: Number, required: true },
  status: { type: String, enum: ["active", "unavailable"], required: true },
  canTakePartyOrders: { type: Boolean, required: true },
  joinDate: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  availability: { type: Map, of: [String], required: true },
  bookings: { type: Number, required: true },
  satisfactionRate: { type: Number, required: true },
  totalReviews: { type: Number, required: true }
});

export default mongoose.model<IChef>('Chef', ChefSchema);