import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Badge,
  Avatar,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Wrap,
  WrapItem,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Link,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "@chakra-ui/icons";

const MotionCard = motion(Card);

interface Chef {
  id: number;
  name: string;
  categories: string[];
  price: number;
  location: string;
  rating: number;
  image: string;
  monthlyFare: number;
  trialCharges: number;
  dynamicPricing: (people: number) => number;
  status: "active" | "unavailable";
  canTakePartyOrders: boolean;
  joinDate: string;
  coordinates: { lat: number; lng: number };
}

const ChefSortingPage: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("distance");
  const [canTakePartyOrders, setCanTakePartyOrders] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const chefs: Chef[] = [
    // ... (previous chef data)
    {
      id: 1,
      name: "Chef Amit",
      categories: ["Maharashtrian", "North Indian"],
      price: 500,
      location: "Mumbai",
      rating: 4.8,
      image: "/api/placeholder/100/100",
      monthlyFare: 15000,
      trialCharges: 1000,
      dynamicPricing: (people) => 500 + people * 100,
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2023-01-15",
      coordinates: { lat: 19.076, lng: 72.8777 },
    },
    {
      id: 2,
      name: "Chef Priya",
      categories: ["South Indian", "Chinese"],
      price: 400,
      location: "Bangalore",
      rating: 4.5,
      image: "/api/placeholder/100/100",
      monthlyFare: 12000,
      trialCharges: 800,
      dynamicPricing: (people) => 400 + people * 100,
      status: "active",
      canTakePartyOrders: false,
      joinDate: "2023-02-20",
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    {
      id: 3,
      name: "Chef Rahul",
      categories: ["Italian", "Mexican"],
      price: 600,
      location: "Delhi",
      rating: 4.7,
      image: "/api/placeholder/100/100",
      monthlyFare: 18000,
      trialCharges: 1200,
      dynamicPricing: (people) => 600 + people * 100,
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2023-03-25",
      coordinates: { lat: 28.7041, lng: 77.1025 },
    },
    {
      id: 4,
      name: "Chef Nisha",
      categories: ["Thai", "Turkish"],
      price: 700,
      location: "Chennai",
      rating: 4.6,
      image: "/api/placeholder/100/100",
      monthlyFare: 21000,
      trialCharges: 1400,
      dynamicPricing: (people) => 700 + people * 100,
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2023-04-30",
      coordinates: { lat: 13.0827, lng: 80.2707 },
    },
    {
      id: 5,
      name: "Chef Ravi",
      categories: ["Mediterranean", "Spanish"],
      price: 550,
      location: "Goa",
      rating: 4.9,
      image: "/api/placeholder/100/100",
      monthlyFare: 16500,
      trialCharges: 1100,
      dynamicPricing: (people) => 550 + people * 100,
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2023-05-10",
      coordinates: { lat: 15.2993, lng: 74.124 },
    },
    {
      id: 6,
      name: "Chef Anjali",
      categories: ["French", "Spanish"],
      price: 650,
      location: "Pune",
      rating: 4.8,
      image: "/api/placeholder/100/100",
      monthlyFare: 19500,
      trialCharges: 1300,
      dynamicPricing: (people) => 650 + people * 100,
      status: "active",
      canTakePartyOrders: false,
      joinDate: "2023-06-15",
      coordinates: { lat: 18.5204, lng: 73.8567 },
    },
    {
      id: 7,
      name: "Chef Aditya",
      categories: ["Italian", "Mexican"],
      price: 750,
      location: "Jaipur",
      rating: 4.7,
      image: "/api/placeholder/100/100",
      monthlyFare: 22500,
      trialCharges: 1500,
      dynamicPricing: (people) => 750 + people * 100,
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2023-07-20",
      coordinates: { lat: 26.9124, lng: 75.7873 },
    },
    {
      id: 8,
      name: "Chef Neha",
      categories: ["Thai", "Turkish"],
      price: 800,
      location: "Hyderabad",
      rating: 4.6,
      image: "/api/placeholder/100/100",
      monthlyFare: 24000,
      trialCharges: 1600,
      dynamicPricing: (people) => 800 + people * 100,
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2023-08-25",
      coordinates: { lat: 17.385, lng: 78.4867 },
    },
    // ... (add more chefs with the new properties)
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location access denied",
          description: "Please enable location services for better results.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    );
  }, [toast]);

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

  const filteredAndSortedChefs = chefs
    .filter(
      (chef) =>
        (selectedCategory === "" ||
          chef.categories.includes(selectedCategory)) &&
        chef.price >= priceRange[0] &&
        chef.price <= priceRange[1] &&
        (!canTakePartyOrders || chef.canTakePartyOrders) &&
        (searchTerm === "" ||
          chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chef.categories.some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          chef.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return calculateDistance(a) - calculateDistance(b);
        case "stars":
          return b.rating - a.rating;
        case "recent":
          return (
            new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
          );
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });

  const allCategories = Array.from(
    new Set(chefs.flatMap((chef) => chef.categories))
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="2xl" mb={8} textAlign="center">
        Find Your Perfect Chef
      </Heading>

      <Box mb={12} bg="white" p={6} borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={6}>
          Refine Your Search
        </Heading>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={8}>
          <Box>
            <Text mb={2} fontWeight="bold">
              Cuisine Category
            </Text>
            <Select
              placeholder="Select a category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              bg="gray.100"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
            >
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text mb={2} fontWeight="bold">
              Price Range (per hour)
            </Text>
            <RangeSlider
              aria-label={["min", "max"]}
              min={0}
              max={1000}
              step={50}
              value={priceRange}
              onChange={(value) => setPriceRange([value[0], value[1]])}
              colorScheme="orange"
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Flex justify="space-between" mt={2}>
              <Text fontSize="sm">${priceRange[0]}</Text>
              <Text fontSize="sm">${priceRange[1]}</Text>
            </Flex>
          </Box>
          <Box>
            <Text mb={2} fontWeight="bold">
              Sort By
            </Text>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              bg="gray.100"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
            >
              <option value="distance">Distance</option>
              <option value="stars">Rating</option>
              <option value="recent">Recently Joined</option>
              <option value="price">Price</option>
            </Select>
          </Box>
        </SimpleGrid>
        <Flex mt={6} justify="space-between" align="center">
          <Checkbox
            isChecked={canTakePartyOrders}
            onChange={(e) => setCanTakePartyOrders(e.target.checked)}
          >
            Can take party orders
          </Checkbox>
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search chefs, cuisines, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Box>

      <AnimatePresence>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {filteredAndSortedChefs.map((chef) => (
            <MotionCard
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setSelectedChef(chef);
                onOpen();
              }}
              cursor="pointer"
              _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
            >
              <CardHeader>
                <Flex align="center">
                  <Avatar src={chef.image} name={chef.name} mr={4} />
                  <Box>
                    <Heading size="md">{chef.name}</Heading>
                    <Wrap spacing={2} mt={1}>
                      {chef.categories.map((category) => (
                        <WrapItem key={category}>
                          <Badge
                            colorScheme="purple"
                            fontSize="0.8em"
                            borderRadius="full"
                          >
                            {category}
                          </Badge>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Stack spacing={2}>
                  <Flex justify="space-between">
                    <Text>Price:</Text>
                    <Text fontWeight="bold">${chef.price}/hr</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Location:</Text>
                    <Text>{chef.location}</Text>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text>Rating:</Text>
                    <Badge
                      colorScheme="green"
                      fontSize="0.8em"
                      borderRadius="full"
                      px={2}
                    >
                      {chef.rating} ⭐
                    </Badge>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text>Status:</Text>
                    <Badge
                      colorScheme={chef.status === "active" ? "green" : "red"}
                      fontSize="0.8em"
                      borderRadius="full"
                      px={2}
                    >
                      {chef.status}
                    </Badge>
                  </Flex>
                  {userLocation && (
                    <Flex justify="space-between" align="center">
                      <Text>Distance:</Text>
                      <Text>{calculateDistance(chef).toFixed(1)} km</Text>
                    </Flex>
                  )}
                </Stack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>
      </AnimatePresence>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChef?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Flex align="center">
                <Avatar
                  src={selectedChef?.image}
                  name={selectedChef?.name}
                  size="xl"
                  mr={4}
                />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Culinary Specialties:
                  </Text>
                  <Wrap spacing={2} mt={1}>
                    {selectedChef?.categories.map((category) => (
                      <WrapItem key={category}>
                        <Badge
                          colorScheme="purple"
                          fontSize="0.8em"
                          borderRadius="full"
                        >
                          {category}
                        </Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                  <Text mt={2}>Location: {selectedChef?.location}</Text>
                  <Badge
                    colorScheme="green"
                    fontSize="0.8em"
                    borderRadius="full"
                    px={2}
                    mt={1}
                  >
                    Rating: {selectedChef?.rating} ⭐
                  </Badge>
                </Box>
              </Flex>
              <Text>
                Experience the culinary mastery of {selectedChef?.name},
                renowned for creating exquisite dishes across multiple cuisines.
              </Text>
              <Stack spacing={2}>
                <Flex justify="space-between">
                  <Text>Hourly Rate:</Text>
                  <Text fontWeight="bold">${selectedChef?.price}/hr</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Monthly Fare:</Text>
                  <Text fontWeight="bold">${selectedChef?.monthlyFare}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Trial Charges:</Text>
                  <Text fontWeight="bold">${selectedChef?.trialCharges}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Dynamic Pricing (4 people):</Text>
                  <Text fontWeight="bold">
                    ${selectedChef?.dynamicPricing(4)}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Can Take Party Orders:</Text>
                  <Text fontWeight="bold">
                    {selectedChef?.canTakePartyOrders ? "Yes" : "No"}
                  </Text>
                </Flex>
              </Stack>
              <Link href={`/chefs/${selectedChef?.id}`} width={"max-content"}>
                <Button colorScheme="orange" onClick={onClose}>
                  Book {selectedChef?.name}
                </Button>
              </Link>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ChefSortingPage;
