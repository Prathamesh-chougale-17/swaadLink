export interface Chef {
  _id: string;
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
  extraPersonCharges: number;
  status: "active" | "unavailable";
  canTakePartyOrders: boolean;
  joinDate: string;
  coordinates: { lat: number; lng: number };
  availability: {
    [key: string]: string[];
  };
  bookings: number;
  satisfactionRate: number;
  totalReviews: number;
}

export interface IFormInputs {
    name: string;
    email: string;
    message: string;
}