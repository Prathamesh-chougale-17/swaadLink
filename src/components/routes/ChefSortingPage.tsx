import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionCard = motion(Card);

const ChefSortingPage = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChef, setSelectedChef] = useState<{
    id: number;
    name: string;
    categories: string[];
    price: number;
    location: string;
    rating: number;
    image: string;
  } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const chefs = [
    {
      id: 1,
      name: "Chef Amit",
      categories: ["Maharashtrian", "North Indian"],
      price: 500,
      location: "Mumbai",
      rating: 4.8,
      image: "/api/placeholder/100/100",
    },
    {
      id: 2,
      name: "Chef Priya",
      categories: ["South Indian", "Sri Lankan"],
      price: 600,
      location: "Bangalore",
      rating: 4.9,
      image: "/api/placeholder/100/100",
    },
    {
      id: 3,
      name: "Chef Li",
      categories: ["Chinese", "Thai", "Japanese"],
      price: 700,
      location: "Delhi",
      rating: 4.7,
      image: "/api/placeholder/100/100",
    },
    {
      id: 4,
      name: "Chef Mehmet",
      categories: ["Turkish", "Mediterranean", "Middle Eastern"],
      price: 800,
      location: "Istanbul",
      rating: 4.6,
      image: "/api/placeholder/100/100",
    },
    {
      id: 5,
      name: "Chef Gino",
      categories: ["Italian", "French"],
      price: 900,
      location: "Rome",
      rating: 4.9,
      image: "/api/placeholder/100/100",
    },
    {
      id: 6,
      name: "Chef Maria",
      categories: ["Mexican", "Spanish", "Portuguese"],
      price: 550,
      location: "Mexico City",
      rating: 4.8,
      image: "/api/placeholder/100/100",
    },
  ];

  const allCategories = Array.from(
    new Set(chefs.flatMap((chef) => chef.categories))
  );

  const filteredChefs = chefs.filter(
    (chef) =>
      (selectedCategory === "" || chef.categories.includes(selectedCategory)) &&
      chef.price >= priceRange[0] &&
      chef.price <= priceRange[1]
  );

  useEffect(() => {
    if (selectedChef) {
      onOpen();
    }
  }, [selectedChef, onOpen]);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="2xl" mb={8} textAlign="center">
        Discover Your Culinary Maestro
      </Heading>

      <Box mb={12} bg="white" p={6} borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="lg" mb={6}>
          Refine Your Search
        </Heading>
        <SimpleGrid columns={[1, null, 2]} spacing={8}>
          <Box>
            <Text mb={2} fontWeight="bold">
              Cuisine Category
            </Text>
            <Select
              placeholder="Select a category"
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
              onChange={setPriceRange}
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
        </SimpleGrid>
      </Box>

      <AnimatePresence>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {filteredChefs.map((chef) => (
            <MotionCard
              key={chef.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedChef(chef)}
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
                From {selectedChef?.categories[0]} to{" "}
                {selectedChef?.categories[selectedChef?.categories.length - 1]},{" "}
                {selectedChef?.name} brings a world of flavors to your table.
              </Text>
              <Text fontWeight="bold">Price: ${selectedChef?.price}/hr</Text>
              <Link to={`/chefs/${selectedChef?.id}`}>
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
