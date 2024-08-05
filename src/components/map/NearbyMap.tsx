import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  Avatar,
  Flex,
  useToast,
} from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";

// You'll need to add a chef icon image to your public folder
const chefIcon = new Icon({
  iconUrl: "/chef-icon.png",
  iconSize: [38, 38],
});

const NearbyChefs = () => {
  const [userLocation, setUserLocation] = useState<LatLngExpression>();
  const [nearbyChefs, setNearbyChefs] = useState<
    {
      id: number;
      name: string;
      location: number[];
      rating: number;
      cuisine: string;
    }[]
  >([]);
  const toast = useToast();

  useEffect(() => {
    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        () => {
          toast({
            title: "Location Error",
            description:
              "Unable to retrieve your location. Using default location.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setUserLocation([51.505, -0.09]); // Default location (London)
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description:
          "Your browser doesn't support geolocation. Using default location.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setUserLocation([51.505, -0.09]); // Default location (London)
    }

    // Fetch nearby chefs (This is a mock function, replace with actual API call)
    fetchNearbyChefs();
  }, [toast]);

  const fetchNearbyChefs = () => {
    // Mock data - replace this with an actual API call
    const mockChefs = [
      {
        id: 1,
        name: "Chef Alice",
        location: [51.51, -0.1],
        rating: 4.8,
        cuisine: "Italian",
      },
      {
        id: 2,
        name: "Chef Bob",
        location: [51.49, -0.08],
        rating: 4.6,
        cuisine: "French",
      },
      {
        id: 3,
        name: "Chef Charlie",
        location: [51.52, -0.11],
        rating: 4.9,
        cuisine: "Indian",
      },
    ];
    setNearbyChefs(mockChefs);
  };

  if (!userLocation) {
    return <Box>Loading map...</Box>;
  }

  return (
    <Flex direction={{ base: "column", md: "row" }} h="80vh">
      <Box flex="1" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {nearbyChefs.map((chef) => (
            <Marker
              key={chef.id}
              position={[chef.location[0], chef.location[1]]}
              icon={chefIcon}
            >
              <Popup>
                <Text fontWeight="bold">{chef.name}</Text>
                <Text>Cuisine: {chef.cuisine}</Text>
                <Text>Rating: {chef.rating}</Text>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
      <VStack flex="1" align="stretch" overflowY="auto">
        <Heading size="lg" mb={4}>
          Nearby Chefs
        </Heading>
        <List spacing={3}>
          {nearbyChefs.map((chef) => (
            <ListItem key={chef.id} p={3} borderWidth={1} borderRadius="md">
              <Flex align="center">
                <Avatar name={chef.name} mr={3} />
                <Box>
                  <Text fontWeight="bold">{chef.name}</Text>
                  <Text fontSize="sm">Cuisine: {chef.cuisine}</Text>
                  <Text fontSize="sm">Rating: {chef.rating}</Text>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Flex>
  );
};

export default NearbyChefs;
