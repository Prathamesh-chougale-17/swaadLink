import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import axios from "axios";

// Define types
interface Chef {
  id: string;
  name: string;
  categories: string[];
  rating: number;
  price: number;
  location: [number, number]; // [latitude, longitude]
}

interface MapPosition {
  lat: number;
  lng: number;
}

// Custom hook for getting user's location
const useGeoLocation = () => {
  const [location, setLocation] = useState<MapPosition | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return location;
};

// Component to recenter map
const RecenterMap: React.FC<{ position: MapPosition }> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
};

// Main component
const AdvancedChefMap: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [filteredChefs, setFilteredChefs] = useState<Chef[]>([]);
  const [mapPosition, setMapPosition] = useState<MapPosition>({
    lat: 51.505,
    lng: -0.09,
  });
  const [searchRadius, setSearchRadius] = useState<number>(5); // km
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const userLocation = useGeoLocation();
  const toast = useToast();

  // Fetch chefs data
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        // const response = await axios.get<Chef[]>("/api/chefs"); // Replace with your API endpoint
        // setChefs(response.data);
        setChefs([
          {
            id: "1",
            name: "Chef 1",
            categories: ["Italian", "Pasta"],
            rating: 4.5,
            price: 50,
            location: [51.505, -0.09],
          },
          {
            id: "2",
            name: "Chef 2",
            categories: ["Japanese", "Sushi"],
            rating: 4.8,
            price: 60,
            location: [51.51, -0.1],
          },
          {
            id: "3",
            name: "Chef 3",
            categories: ["Mexican", "Tacos"],
            rating: 4.2,
            price: 40,
            location: [51.515, -0.095],
          },
        ]);
      } catch (error) {
        console.error("Error fetching chefs:", error);
        toast({
          title: "Error fetching chefs",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchChefs();
  }, [toast]);

  // Filter chefs based on location, categories, and price
  useEffect(() => {
    const filtered = chefs.filter((chef) => {
      const distance =
        L.latLng(mapPosition.lat, mapPosition.lng).distanceTo(
          L.latLng(chef.location[0], chef.location[1])
        ) / 1000; // Convert to km
      const categoryMatch =
        selectedCategories.length === 0 ||
        chef.categories.some((cat) => selectedCategories.includes(cat));
      const priceMatch =
        chef.price >= priceRange[0] && chef.price <= priceRange[1];
      return distance <= searchRadius && categoryMatch && priceMatch;
    });
    setFilteredChefs(filtered);
  }, [chefs, mapPosition, searchRadius, selectedCategories, priceRange]);

  // Custom chef icon
  const chefIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "/vite.svg", // Replace with your chef icon
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
      }),
    []
  );

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle using current location
  const handleUseCurrentLocation = () => {
    if (userLocation) {
      setMapPosition(userLocation);
      toast({
        title: "Using your current location",
        status: "success",
        duration: 2000,
      });
    } else {
      toast({
        title: "Unable to get your location",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box height="100vh" width="100%">
      <Flex height="100%">
        <VStack width="300px" p={4} bg="gray.50" overflowY="auto">
          <Input
            placeholder="Search location"
            mb={2}
            onChange={() => {
              // Implement geocoding to convert address to coordinates
              // Update mapPosition based on geocoding result
            }}
          />
          <Button onClick={handleUseCurrentLocation} mb={2}>
            Use My Location
          </Button>
          <Input
            type="number"
            placeholder="Search radius (km)"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            mb={2}
          />
          <Text fontWeight="bold" mb={2}>
            Categories
          </Text>
          {Array.from(new Set(chefs.flatMap((chef) => chef.categories))).map(
            (category) => (
              <Button
                key={category}
                size="sm"
                colorScheme={
                  selectedCategories.includes(category) ? "blue" : "gray"
                }
                onClick={() => handleCategoryChange(category)}
                mb={1}
              >
                {category}
              </Button>
            )
          )}
          <Text fontWeight="bold" mt={4} mb={2}>
            Price Range
          </Text>
          <Flex width="100%">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              mr={2}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </Flex>
          <Text mt={4}>Found {filteredChefs.length} chefs</Text>
        </VStack>
        <Box flex={1}>
          <MapContainer
            center={mapPosition}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              className="z-0"
            />
            <RecenterMap position={mapPosition} />
            {filteredChefs.map((chef) => (
              <Marker key={chef.id} position={chef.location} icon={chefIcon}>
                <Popup>
                  <Text fontWeight="bold">{chef.name}</Text>
                  <Text>Categories: {chef.categories.join(", ")}</Text>
                  <Text>Rating: {chef.rating}</Text>
                  <Text>Price: ${chef.price}/hr</Text>
                  <Button size="sm" colorScheme="blue" mt={2}>
                    Book Now
                  </Button>
                </Popup>
              </Marker>
            ))}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={L.icon({ iconUrl: "/vite.svg", iconSize: [38, 38] })}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdvancedChefMap;
