import React, { useState, useMemo } from "react";
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

// Define TypeScript interfaces
interface Chef {
  id: number;
  name: string;
  cuisines: string[];
  price: number;
  rating: number;
  distance: number;
  image: string;
}

interface CuisineGroup {
  [key: string]: Chef[];
}

// Sample data
const chefs: Chef[] = [
  {
    id: 1,
    name: "Alain Ducasse",
    cuisines: ["French", "Mediterranean"],
    price: 300,
    rating: 4.9,
    distance: 5.2,
    image: "/api/placeholder/150/150",
  },
  {
    id: 2,
    name: "Massimo Bottura",
    cuisines: ["Italian", "Modern"],
    price: 250,
    rating: 4.8,
    distance: 3.7,
    image: "/api/placeholder/150/150",
  },
  {
    id: 3,
    name: "Carme Ruscalleda",
    cuisines: ["Catalan", "Spanish"],
    price: 220,
    rating: 4.7,
    distance: 7.1,
    image: "/api/placeholder/150/150",
  },
  {
    id: 4,
    name: "Yoshihiro Murata",
    cuisines: ["Japanese", "Kaiseki"],
    price: 280,
    rating: 4.9,
    distance: 6.3,
    image: "/api/placeholder/150/150",
  },
  {
    id: 5,
    name: "Anne-Sophie Pic",
    cuisines: ["French", "Innovative"],
    price: 270,
    rating: 4.8,
    distance: 4.5,
    image: "/api/placeholder/150/150",
  },
  {
    id: 6,
    name: "Gordon Ramsay",
    cuisines: ["British", "French"],
    price: 290,
    rating: 4.7,
    distance: 8.2,
    image: "/api/placeholder/150/150",
  },
  {
    id: 7,
    name: "Gaggan Anand",
    cuisines: ["Indian", "Progressive"],
    price: 230,
    rating: 4.8,
    distance: 5.9,
    image: "/api/placeholder/150/150",
  },
  {
    id: 8,
    name: "Elena Arzak",
    cuisines: ["Basque", "Avant-garde"],
    price: 240,
    rating: 4.7,
    distance: 7.8,
    image: "/api/placeholder/150/150",
  },
  {
    id: 9,
    name: "Virgilio Martínez",
    cuisines: ["Peruvian"],
    price: 260,
    rating: 4.9,
    distance: 4.3,
    image: "/api/placeholder/150/150",
  },
  {
    id: 10,
    name: "David Chang",
    cuisines: ["Asian", "Fusion"],
    price: 200,
    rating: 4.6,
    distance: 6.7,
    image: "/api/placeholder/150/150",
  },
];

const MotionBox = motion(Box);

const FindChefByCuisine: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "distance">(
    "rating"
  );

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");

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
  }, [searchTerm, selectedCuisine, sortBy]);

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
    []
  );

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
                      <Text color="gray.500">
                        {chef.distance.toFixed(1)} km away
                      </Text>
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
