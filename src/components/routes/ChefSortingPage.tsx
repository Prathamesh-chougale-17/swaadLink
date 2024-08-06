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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const MotionCard = motion(Card);

interface Chef {
  id: number;
  name: string;
  categories: string[];
  price: number;
  location: string;
  rating: number;
  image: string;
  status: "active" | "unavailable";
  canTakePartyOrders: boolean;
  joinDate: string;
  distance: number;
}

const ChefSortingPage: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("distance");
  const [canTakePartyOrders, setCanTakePartyOrders] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredChefs, setFilteredChefs] = useState<Chef[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const toast = useToast();

  const chefs: Chef[] = [
    // ... (Your chef data here, including new fields like status, canTakePartyOrders, joinDate, and distance)
    {
      id: 1,
      name: "Chef Amit Kumar",
      categories: ["North Indian", "Mughlai", "Continental"],
      price: 800,
      location: "Mumbai, India",
      rating: 4.8,
      image: "/chef.jpg",
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2021-06-01",
      distance: 5,
    },
    {
      id: 2,
      name: "Chef Maria Rodriguez",
      categories: ["Mexican", "Spanish", "Italian"],
      price: 750,
      location: "Barcelona, Spain",
      rating: 4.5,
      image: "/chef.jpg",
      status: "active",
      canTakePartyOrders: false,
      joinDate: "2021-06-15",
      distance: 10,
    },
    {
      id: 3,
      name: "Chef Ananya Joshi",
      categories: ["Maharashtrian", "South Indian", "Chinese"],
      price: 700,
      location: "Pune, India",
      rating: 4.2,
      image: "/chef.jpg",
      status: "unavailable",
      canTakePartyOrders: true,
      joinDate: "2021-07-01",
      distance: 2,
    },
    {
      id: 4,
      name: "Chef Pierre Lacroix",
      categories: ["French", "Italian", "Mediterranean"],
      price: 900,
      location: "Paris, France",
      rating: 4.9,
      image: "/chef.jpg",
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2021-07-15",
      distance: 15,
    },
    {
      id: 5,
      name: "Chef Li Wei",
      categories: ["Chinese", "Thai", "Japanese"],
      price: 850,
      location: "Beijing, China",
      rating: 4.6,
      image: "/chef.jpg",
      status: "active",
      canTakePartyOrders: true,
      joinDate: "2021-08-01",
      distance: 20,
    },
  ];

  const allCategories = Array.from(
    new Set(chefs.flatMap((chef) => chef.categories))
  );
  const result = chefs.filter(
    (chef) =>
      (selectedCategory === "" || chef.categories.includes(selectedCategory)) &&
      chef.price >= priceRange[0] &&
      chef.price <= priceRange[1] &&
      (!canTakePartyOrders || chef.canTakePartyOrders) &&
      (searchTerm === "" ||
        chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chef.categories.some((cat) =>
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        chef.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  useEffect(() => {
    const filterAndSortChefs = () => {
      result.sort((a, b) => {
        switch (sortBy) {
          case "distance":
            return a.distance - b.distance;
          case "rating":
            return b.rating - a.rating;
          case "recent":
            return (
              new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
            );
          default:
            return 0;
        }
      });

      setFilteredChefs(result);
    };
    filterAndSortChefs();
  }, [
    priceRange,
    selectedCategory,
    sortBy,
    canTakePartyOrders,
    searchTerm,
    result,
  ]);

  const handleChefSelect = (chef: Chef) => {
    setSelectedChef(chef);
    onOpen();
  };

  const handleQuickBook = (chef: Chef) => {
    toast({
      title: "Chef Booked!",
      description: `You've successfully booked ${chef.name}. They will contact you shortly.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="2xl" mb={8} textAlign="center">
        Find Your Perfect Chef
      </Heading>

      <Box mb={12} bg="white" p={6} borderRadius="lg" boxShadow="md">
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
              onChange={(value: number[]) =>
                setPriceRange([value[0], value[1]])
              }
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
              <option value="rating">Rating</option>
              <option value="recent">Recently Joined</option>
            </Select>
          </Box>
        </SimpleGrid>
        <Flex mt={6} alignItems="center">
          <Checkbox
            isChecked={canTakePartyOrders}
            onChange={(e) => setCanTakePartyOrders(e.target.checked)}
            mr={4}
          >
            Can take party orders
          </Checkbox>
          <InputGroup maxW="300px">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search chefs, cuisines, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Box>

      <AnimatePresence>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {filteredChefs.map((chef) => (
            <MotionCard
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              cursor="pointer"
              _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
            >
              <CardHeader>
                <Flex align="center" justify="space-between">
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
                  <Badge
                    colorScheme={chef.status === "active" ? "green" : "red"}
                    fontSize="0.8em"
                    borderRadius="full"
                  >
                    {chef.status}
                  </Badge>
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
                    <Flex align="center">
                      <StarIcon color="yellow.400" mr={1} />
                      <Text fontWeight="bold">{chef.rating.toFixed(1)}</Text>
                    </Flex>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Text>Distance:</Text>
                    <Text>{chef.distance.toFixed(1)} km</Text>
                  </Flex>
                  <Flex justify="space-between" mt={2}>
                    <Button size="sm" onClick={() => handleChefSelect(chef)}>
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="orange"
                      onClick={() => handleQuickBook(chef)}
                    >
                      Quick Book
                    </Button>
                  </Flex>
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
                  <Flex align="center" mt={1}>
                    <StarIcon color="yellow.400" mr={1} />
                    <Text fontWeight="bold">
                      {selectedChef?.rating.toFixed(1)}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Text>
                Experience the culinary mastery of {selectedChef?.name},
                renowned for creating exquisite dishes across multiple cuisines.
              </Text>
              <Text fontWeight="bold">Price: ${selectedChef?.price}/hr</Text>
              <Text>
                <TimeIcon mr={2} />
                Joined:{" "}
                {new Date(selectedChef?.joinDate || "").toLocaleDateString()}
              </Text>
              <Flex justify="space-between">
                <Link to={`/chefs/${selectedChef?.id}`}>
                  <Button colorScheme="blue" onClick={onClose}>
                    Full Profile
                  </Button>
                </Link>
                <Button
                  colorScheme="orange"
                  onClick={() => handleQuickBook(selectedChef!)}
                >
                  Book Now
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ChefSortingPage;
