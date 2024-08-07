export interface MapChef {
    id: string;
    name: string;
    categories: string[];
    rating: number;
    price: number;
    location: [number, number]; // [latitude, longitude]
  }

    export interface ChefWithDistance extends MapChef {
        distance: number;
    }

    export interface MapPosition {
        lat: number;
        lng: number;
      }

export interface Chef {
  id: string;
  name: string;
  image: string;
  categories: string[];
  price: number;
  location: string;
  rating: number;
  bio: string;
  specialDishes: string[];
  awards: string[];
  monthlyFare: number;
  trialCharges: number;
  dynamicPricing: (people: number) => number;
  status: "active" | "unavailable";
  availability: {
    [key: string]: string[];
  };
}