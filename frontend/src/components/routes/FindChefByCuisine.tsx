import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Select,
  SimpleGrid,
  Flex,
  Button,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { getChefs } from "../../services/api";
import { Chef } from "../type";
import LoadingComponent from "../global/Loading";

// Define TypeScript interfaces

interface localChef {
  id: string;
  name: string;
  cuisines: string[];
  price: number;
  rating: number;
  distance: number;
  image: string;
}

interface CuisineGroup {
  [key: string]: localChef[];
}

// Sample data
const MotionBox = motion(Box);

const FindChefByCuisine: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<Chef[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "distance">(
    "rating"
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chefs = await getChefs();
        setData(chefs);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  });

  const calculateDistance = (chef: Chef): number => {
    if (!userLocation) return Infinity;
    const R = 6371; // Earth's radius in km
    const dLat = (chef.coordinates.lat - userLocation.lat) * (Math.PI / 180);
    const dLon = (chef.coordinates.lng - userLocation.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLocation.lat * (Math.PI / 180)) *
        Math.cos(chef.coordinates.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const chefs = data.map((chef) => ({
    id: chef._id,
    name: chef.name,
    cuisines: chef.categories,
    price: chef.price,
    rating: chef.rating,
    distance: Number(calculateDistance(chef).toFixed(1)),
    image: chef.image,
  }));

  const filteredAndSortedChefs = useMemo(() => {
    return chefs
      .filter(
        (chef) =>
          (chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chef.cuisines.some((cuisine) =>
              cuisine.toLowerCase().includes(searchTerm.toLowerCase())
            )) &&
          (selectedCuisine === "" || chef.cuisines.includes(selectedCuisine))
      )
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [searchTerm, selectedCuisine, sortBy, chefs]);

  const groupedChefs = useMemo(() => {
    return filteredAndSortedChefs.reduce((acc: CuisineGroup, chef) => {
      chef.cuisines.forEach((cuisine) => {
        if (!acc[cuisine]) {
          acc[cuisine] = [];
        }
        acc[cuisine].push(chef);
      });
      return acc;
    }, {});
  }, [filteredAndSortedChefs]);

  const allCuisines = useMemo(
    () => Array.from(new Set(chefs.flatMap((chef) => chef.cuisines))).sort(),
    [chefs]
  );

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Find Chef By Cuisine
        </Heading>
        <Text fontSize="xl" textAlign="center" mb={12}>
          Explore chefs specializing in various cuisines
        </Text>

        <VStack spacing={6} mb={12}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search for chefs or cuisines"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              bg={cardBgColor}
            />
          </InputGroup>

          <HStack width="100%" spacing={4}>
            <Select
              placeholder="Select Cuisine"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              size="lg"
              bg={cardBgColor}
            >
              {allCuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </Select>
            <Select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "price" | "rating" | "distance")
              }
              size="lg"
              bg={cardBgColor}
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="distance">Sort by Distance</option>
            </Select>
          </HStack>
        </VStack>

        <AnimatePresence>
          {Object.entries(groupedChefs).map(([cuisine, chefs]) => (
            <MotionBox
              key={cuisine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              mb={12}
            >
              <Heading as="h2" size="xl" mb={6}>
                {cuisine} Cuisine
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {chefs.map((chef) => (
                  <MotionBox
                    key={chef.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      bg={cardBgColor}
                      p={6}
                      borderRadius="lg"
                      boxShadow="md"
                      transition="all 0.3s"
                      _hover={{ boxShadow: "lg" }}
                    >
                      <Flex alignItems="center" mb={4}>
                        <Avatar
                          size="xl"
                          name={chef.name}
                          src={chef.image}
                          mr={4}
                        />
                        <VStack align="start" spacing={1}>
                          <Heading as="h3" size="md">
                            {chef.name}
                          </Heading>
                          <HStack>
                            {chef.cuisines.map((cuisine) => (
                              <Badge key={cuisine} colorScheme="purple">
                                {cuisine}
                              </Badge>
                            ))}
                          </HStack>
                        </VStack>
                      </Flex>
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold">${chef.price}/hr</Text>
                        <HStack>
                          <StarIcon color="yellow.400" />
                          <Text>{chef.rating.toFixed(1)}</Text>
                        </HStack>
                      </HStack>
                      <Text color="gray.500">{chef.distance} km away</Text>
                      <Button colorScheme="blue" mt={4} w="full">
                        Book Now
                      </Button>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionBox>
          ))}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default FindChefByCuisine;
