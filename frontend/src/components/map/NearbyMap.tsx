import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  Text,
  useToast,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Checkbox,
  Heading,
  SimpleGrid,
  Badge,
  Spinner,
  Select,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ChefCard from "../models/chefBlock";
import { getChefs } from "../../services/api";
import { Chef } from "../type";

// Define types
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
    map.setView(position, 13);
  }, [position, map]);
  return null;
};

// Main component
const AdvancedChefMap: React.FC = () => {
  const [isDistance, setIsDistance] = useState<boolean>(false);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [filteredChefs, setFilteredChefs] = useState<Chef[]>([]);
  const [mapPosition, setMapPosition] = useState<MapPosition>({
    lat: 51.505,
    lng: -0.09,
  });
  const [searchRadius, setSearchRadius] = useState<number>(5); // km
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 100]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userLocation = useGeoLocation();
  const toast = useToast();
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">(
    "distance"
  );
  const [allFilterChef, setAllFilterChef] = useState<Chef[]>([]);

  // Fetch chefs data
  useEffect(() => {
    const fetchChefs = async () => {
      setIsLoading(true);
      try {
        const data = await getChefs();
        setChefs(data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
        toast({
          title: "Error fetching chefs",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchChefs();
  }, [toast]);

  // Filter chefs based on location, categories, and price
  useEffect(() => {
    const filtered = chefs.filter((chef) => {
      const distance =
        L.latLng(mapPosition.lat, mapPosition.lng).distanceTo(
          L.latLng(chef.coordinates.lat, chef.coordinates.lng)
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

  useEffect(() => {
    const filterChef = chefs.filter((chef) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        chef.categories.some((cat) => selectedCategories.includes(cat));
      const priceMatch =
        chef.price >= priceRange[0] && chef.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
    setAllFilterChef(filterChef);
  }, [selectedCategories, priceRange, chefs]);

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
  const sortedChefs = useMemo(() => {
    const chefsWithDistance = filteredChefs.map(
      (chef) => ({
        ...chef,
        distance:
          L.latLng(mapPosition.lat, mapPosition.lng).distanceTo(
            L.latLng(chef.coordinates.lat, chef.coordinates.lng)
          ) / 1000,
      }),
      [filteredChefs]
    );
    return chefsWithDistance.sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "price") return a.price - b.price;
      return b.rating - a.rating;
    });
  }, [filteredChefs, mapPosition, sortBy]);

  const allSortedChefs = useMemo(() => {
    const chefsWithDistance = allFilterChef.map(
      (chef) => ({
        ...chef,
        distance:
          L.latLng(mapPosition.lat, mapPosition.lng).distanceTo(
            L.latLng(chef.coordinates.lat, chef.coordinates.lng)
          ) / 1000,
      }),
      [allFilterChef]
    );
    return chefsWithDistance.sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "price") return a.price - b.price;
      return b.rating - a.rating;
    });
  }, [allFilterChef, mapPosition, sortBy]);

  return (
    <Box width="100%" bg="gray.50">
      <Flex height="100%" direction={{ base: "column", md: "row" }}>
        <VStack
          width={{ base: "100%", md: "300px" }}
          p={4}
          bg="white"
          boxShadow="md"
          overflowY="auto"
          spacing={4}
        >
          <Heading size="md">Chef Finder</Heading>
          <Input
            placeholder="Search location"
            onChange={() => {
              // Implement geocoding to convert address to coordinates
              // Update mapPosition based on geocoding result
            }}
          />
          <Button
            colorScheme="blue"
            onClick={handleUseCurrentLocation}
            width="100%"
          >
            Use My Location
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => setIsDistance((prev) => !prev)}
            width="100%"
          >
            Show near by chefs
          </Button>
          <Input
            type="number"
            placeholder="Search radius (km)"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
          />
          <Text fontWeight="bold" alignSelf="flex-start">
            Categories
          </Text>
          <SimpleGrid columns={2} spacing={2} width="100%">
            {Array.from(new Set(chefs.flatMap((chef) => chef.categories)))
              .sort()
              .map((category) => (
                <Checkbox
                  key={category}
                  isChecked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                >
                  {category}
                </Checkbox>
              ))}
          </SimpleGrid>
          <Text fontWeight="bold" alignSelf="flex-start">
            Price Range
          </Text>
          <Flex width="100%" direction="column">
            <RangeSlider
              aria-label={["min", "max"]}
              min={20}
              max={100}
              step={5}
              value={priceRange}
              onChange={(value) => setPriceRange([value[0], value[1]])}
              colorScheme="blue"
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Flex justify="space-between" mt={2}>
              <Text>${priceRange[0]}</Text>
              <Text>${priceRange[1]}</Text>
            </Flex>
          </Flex>
          <Text fontWeight="bold">
            Found {isDistance ? filteredChefs.length : allSortedChefs.length}{" "}
            chef
            {isDistance && (filteredChefs.length !== 1 ? "s" : "")}
            {isDistance && (allSortedChefs.length !== 1 ? "s" : "")}
          </Text>
          <Select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "distance" | "price" | "rating")
            }
          >
            <option value="distance">Sort by Distance</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </Select>
          <Box maxHeight="300px" overflowY="auto" width="100%">
            <SimpleGrid columns={1} spacing={4}>
              {isDistance
                ? sortedChefs.map((chef) => (
                    <ChefCard key={chef._id} chef={chef} />
                  ))
                : allSortedChefs.map((chef) => (
                    <ChefCard key={chef._id} chef={chef} />
                  ))}
            </SimpleGrid>
          </Box>
        </VStack>
        <Box flex={1} position="relative">
          {isLoading && (
            <Flex
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(255, 255, 255, 0.7)"
              zIndex={1000}
              justify="center"
              align="center"
            >
              <Spinner size="xl" />
            </Flex>
          )}
          <MapContainer
            center={mapPosition}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <RecenterMap position={mapPosition} />
            {isDistance && (
              <Circle center={mapPosition} radius={searchRadius * 1000} />
            )}
            {isDistance
              ? filteredChefs.map((chef) => (
                  <Marker
                    key={chef._id}
                    position={chef.coordinates}
                    icon={chefIcon}
                  >
                    <Popup>
                      <VStack align="flex-start" spacing={1}>
                        <Heading size="sm">{chef.name}</Heading>
                        <Flex wrap="wrap" gap={1}>
                          {chef.categories.map((category) => (
                            <Badge key={category} colorScheme="blue">
                              {category}
                            </Badge>
                          ))}
                        </Flex>
                        <Text>Rating: {chef.rating} ⭐</Text>
                        <Text>Price: ${chef.price}/session</Text>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          mt={2}
                          as={"a"}
                          href={`/chefs/${chef._id}`}
                          className="text-white"
                        >
                          Book Now
                        </Button>
                      </VStack>
                    </Popup>
                  </Marker>
                ))
              : allFilterChef.map((chef) => (
                  <Marker
                    key={chef._id}
                    position={chef.coordinates}
                    icon={chefIcon}
                  >
                    <Popup>
                      <VStack align="flex-start" spacing={1}>
                        <Heading size="sm">{chef.name}</Heading>
                        <Flex wrap="wrap" gap={1}>
                          {chef.categories.map((category) => (
                            <Badge key={category} colorScheme="blue">
                              {category}
                            </Badge>
                          ))}
                        </Flex>
                        <Text>Rating: {chef.rating} ⭐</Text>
                        <Text>Price: ${chef.price}/session</Text>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          mt={2}
                          as={"a"}
                          href={`/chefs/${chef._id}`}
                          className="text-white"
                        >
                          Book Now
                        </Button>
                      </VStack>
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
