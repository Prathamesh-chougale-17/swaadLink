import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "@chakra-ui/icons";
import { Chef } from "../type";
import { getChefs } from "../../services/api";
import LoadingComponent from "../global/Loading";
const MotionCard = motion(Card);

const ChefSortingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("distance");
  const [canTakePartyOrders, setCanTakePartyOrders] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chefs, setChefs] = useState<Chef[]>([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const chefs: Chef[] = [
  //   {
  //     id: "1",
  //     name: "Chef John Doe",
  //     categories: ["Italian", "French", "Japanese"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef1.jpg",
  //     price: 100,
  //     location: "New York, USA",
  //     specialDishes: ["Pasta", "Ratatouille", "Sushi"],
  //     experience: 10,
  //     rating: 4.5,
  //     languages: ["English", "French", "Italian"],
  //     image: "/images/chef1.jpg",
  //     monthlyFare: 2000,
  //     awards: ["Best Chef 2018", "Top 10 Chefs in USA"],
  //     trialCharges: 50,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: true,
  //     joinDate: "2021-01-01",
  //     coordinates: { lat: 40.7128, lng: -74.006 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 50,
  //     satisfactionRate: 95,
  //     totalReviews: 100,
  //   },
  //   {
  //     id: "2",
  //     name: "Chef Jane Doe",
  //     categories: ["Mexican", "Chinese", "Indian"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef2.jpg",
  //     price: 120,
  //     location: "Los Angeles, USA",
  //     specialDishes: ["Tacos", "Dim Sums", "Biryani"],
  //     experience: 8,
  //     rating: 4.2,
  //     languages: ["English", "Spanish", "Hindi"],
  //     image: "/images/chef2.jpg",
  //     monthlyFare: 2500,
  //     awards: ["Top 10 Chefs in USA"],
  //     trialCharges: 60,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: false,
  //     joinDate: "2021-02-01",
  //     coordinates: { lat: 34.0522, lng: -118.2437 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 40,
  //     satisfactionRate: 90,
  //     totalReviews: 80,
  //   },
  //   {
  //     id: "3",
  //     name: "Chef Alice Smith",
  //     categories: ["American", "Mediterranean", "Thai"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef3.jpg",
  //     price: 90,
  //     location: "Chicago, USA",
  //     specialDishes: ["Burgers", "Falafel", "Pad Thai"],
  //     experience: 12,
  //     rating: 4.7,
  //     languages: ["English", "Arabic", "Thai"],
  //     image: "/images/chef3.jpg",
  //     monthlyFare: 1800,
  //     awards: ["Best Chef 2019", "Top 5 Chefs in USA"],
  //     trialCharges: 45,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: true,
  //     joinDate: "2021-03-01",
  //     coordinates: { lat: 41.8781, lng: -87.6298 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 60,
  //     satisfactionRate: 98,
  //     totalReviews: 120,
  //   },
  //   {
  //     id: "4",
  //     name: "Chef Bob Brown",
  //     categories: ["Greek", "Korean", "Vietnamese"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef4.jpg",
  //     price: 110,
  //     location: "San Francisco, USA",
  //     specialDishes: ["Gyros", "Bibimbap", "Pho"],
  //     experience: 9,
  //     rating: 4.4,
  //     languages: ["English", "Greek", "Korean"],
  //     image: "/images/chef4.jpg",
  //     monthlyFare: 2200,
  //     awards: ["Top 10 Chefs in USA"],
  //     trialCharges: 55,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: false,
  //     joinDate: "2021-04-01",
  //     coordinates: { lat: 37.7749, lng: -122.4194 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 45,
  //     satisfactionRate: 92,
  //     totalReviews: 90,
  //   },
  //   {
  //     id: "5",
  //     name: "Chef Emily Johnson",
  //     categories: ["Spanish", "Turkish", "Lebanese"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef5.jpg",
  //     price: 95,
  //     location: "Miami, USA",
  //     specialDishes: ["Paella", "Kebabs", "Falafel"],
  //     experience: 11,
  //     rating: 4.6,
  //     languages: ["English", "Spanish", "Turkish"],
  //     image: "/images/chef5.jpg",
  //     monthlyFare: 1900,
  //     awards: ["Top 5 Chefs in USA"],
  //     trialCharges: 50,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: true,
  //     joinDate: "2021-05-01",
  //     coordinates: { lat: 25.7617, lng: -80.1918 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 55,
  //     satisfactionRate: 96,
  //     totalReviews: 110,
  //   },
  //   {
  //     id: "6",
  //     name: "Chef David Wilson",
  //     categories: ["German", "Russian", "Swedish"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef6.jpg",
  //     price: 130,
  //     location: "Seattle, USA",
  //     specialDishes: ["Schnitzel", "Pelmeni", "Meatballs"],
  //     experience: 7,
  //     rating: 4.1,
  //     languages: ["English", "German", "Russian"],
  //     image: "/images/chef6.jpg",
  //     monthlyFare: 2600,
  //     awards: ["Top 10 Chefs in USA"],
  //     trialCharges: 65,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: false,
  //     joinDate: "2021-06-01",
  //     coordinates: { lat: 47.6062, lng: -122.3321 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 35,
  //     satisfactionRate: 88,
  //     totalReviews: 70,
  //   },
  //   {
  //     id: "7",
  //     name: "Chef Sarah Miller",
  //     categories: ["Brazilian", "Peruvian", "Argentinian"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef7.jpg",
  //     price: 85,
  //     location: "Rio de Janeiro, Brazil",
  //     specialDishes: ["Feijoada", "Ceviche", "Asado"],
  //     experience: 13,
  //     rating: 4.8,
  //     languages: ["English", "Portuguese", "Spanish"],
  //     image: "/images/chef7.jpg",
  //     monthlyFare: 1700,
  //     awards: ["Best Chef 2020", "Top 5 Chefs in Brazil"],
  //     trialCharges: 42.5,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: true,
  //     joinDate: "2021-07-01",
  //     coordinates: { lat: -22.9068, lng: -43.1729 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 65,
  //     satisfactionRate: 99,
  //     totalReviews: 130,
  //   },
  //   {
  //     id: "8",
  //     name: "Chef John Doe",
  //     categories: ["Italian", "French", "Japanese"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef1.jpg",
  //     price: 100,
  //     location: "New York, USA",
  //     specialDishes: ["Pasta", "Ratatouille", "Sushi"],
  //     experience: 10,
  //     rating: 4.5,
  //     languages: ["English", "French", "Italian"],
  //     image: "/images/chef1.jpg",
  //     monthlyFare: 2000,
  //     awards: ["Best Chef 2018", "Top 10 Chefs in USA"],
  //     trialCharges: 50,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: true,
  //     joinDate: "2021-01-01",
  //     coordinates: { lat: 40.7128, lng: -74.006 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 50,
  //     satisfactionRate: 95,
  //     totalReviews: 100,
  //   },
  //   {
  //     id: "9",
  //     name: "Chef Jane Doe",
  //     categories: ["Mexican", "Chinese", "Indian"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef2.jpg",
  //     price: 120,
  //     location: "Los Angeles, USA",
  //     specialDishes: ["Tacos", "Dim Sums", "Biryani"],
  //     experience: 8,
  //     rating: 4.2,
  //     languages: ["English", "Spanish", "Hindi"],
  //     image: "/images/chef2.jpg",
  //     monthlyFare: 2500,
  //     awards: ["Top 10 Chefs in USA"],
  //     trialCharges: 60,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: false,
  //     joinDate: "2021-02-01",
  //     coordinates: { lat: 34.0522, lng: -118.2437 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 40,
  //     satisfactionRate: 90,
  //     totalReviews: 80,
  //   },
  //   {
  //     id: "10",
  //     name: "Chef Alice Smith",
  //     categories: ["American", "Mediterranean", "Thai"],
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus vitae libero.",
  //     coverImage: "/images/chef3.jpg",
  //     price: 90,
  //     location: "Chicago, USA",
  //     specialDishes: ["Burgers", "Falafel", "Pad Thai"],
  //     experience: 12,
  //     rating: 4.7,
  //     languages: ["English", "Arabic", "Thai"],
  //     image: "/images/chef3.jpg",
  //     monthlyFare: 1800,
  //     awards: ["Best Chef 2019", "Top 5 Chefs in USA"],
  //     trialCharges: 45,
  //     extraPersonCharges: 20,
  //     status: "active",
  //     canTakePartyOrders: true,
  //     joinDate: "2021-03-01",
  //     coordinates: { lat: 41.8781, lng: -87.6298 },
  //     availability: {
  //       Sunday: ["10:00", "14:00", "18:00"],
  //       Monday: ["11:00", "15:00", "19:00"],
  //       Tuesday: ["11:00", "15:00", "19:00"],
  //       Wednesday: ["11:00", "15:00", "19:00"],
  //       Thursday: ["11:00", "15:00", "19:00"],
  //       Friday: ["11:00", "15:00", "19:00"],
  //       Saturday: ["11:00", "15:00", "19:00"],
  //     },
  //     bookings: 60,
  //     satisfactionRate: 98,
  //     totalReviews: 120,
  //   },
  //   // ... (add more chefs with the new properties)
  // ];

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

  useEffect(() => {
    const fetchChefs = async () => {
      setIsLoading(true);
      try {
        const fetchedChefs = await getChefs();
        setChefs(fetchedChefs);
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

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams, { replace: true });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    updateSearchParams({
      priceMin: value[0].toString(),
      priceMax: value[1].toString(),
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateSearchParams({ category: value || null });
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    updateSearchParams({ sort: value });
  };

  const handleCanTakePartyOrdersChange = (value: boolean) => {
    setCanTakePartyOrders(value);
    updateSearchParams({ partyOrders: value.toString() });
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    updateSearchParams({ search: value || null });
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

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
              onChange={(e) => handleCategoryChange(e.target.value)}
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
              onChange={(value) => handlePriceRangeChange([value[0], value[1]])}
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
              onChange={(e) => handleSortByChange(e.target.value)}
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
            onChange={(e) => handleCanTakePartyOrdersChange(e.target.checked)}
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
              onChange={(e) => handleSearchTermChange(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Box>

      <AnimatePresence>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {filteredAndSortedChefs.map((chef) => (
            <MotionCard
              key={chef._id}
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
                    <Text fontWeight="bold">${chef.price}/session</Text>
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
                  <Text fontWeight="bold">${selectedChef?.price}/session</Text>
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
                  <Text>Family Pricing (4 people):</Text>
                  <Text fontWeight="bold">
                    $
                    {(selectedChef?.price ?? 0) +
                      (selectedChef?.extraPersonCharges ?? 0) * 4}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Can Take Party Orders:</Text>
                  <Text fontWeight="bold">
                    {selectedChef?.canTakePartyOrders ? "Yes" : "No"}
                  </Text>
                </Flex>
              </Stack>
              <Button
                colorScheme="orange"
                onClick={onClose}
                as={"a"}
                href={`/chefs/${selectedChef?._id}`}
              >
                Book {selectedChef?.name}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ChefSortingPage;
