import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon, ChatIcon, CalendarIcon } from "@chakra-ui/icons";
// import { AnimatePresence, motion } from "framer-motion";

// const MotionBox = motion(Box);

interface ChefData {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  categories: string[];
  price: number;
  monthlyFare: number;
  trialCharges: number;
  location: string;
  rating: number;
  totalReviews: number;
  bio: string;
  specialDishes: string[];
  awards: string[];
  experience: number;
  languages: string[];
  availability: {
    status: "available" | "unavailable";
    nextAvailable?: string;
  };
  bookings: number;
  satisfactionRate: number;
}

const chef: ChefData = {
  id: "1",
  name: "Chef Amit Kumar",
  image: "/chef.jpg",
  coverImage: "/kitchen-background.jpg",
  categories: ["North Indian", "Mughlai", "Continental"],
  price: 800,
  monthlyFare: 15000,
  trialCharges: 1000,
  location: "Mumbai, India",
  rating: 4.8,
  totalReviews: 127,
  bio: "With over 15 years of culinary experience, Chef Amit Kumar brings the rich flavors of North India and the finesse of Continental cuisine to your table. His innovative fusion dishes have earned him acclaim in Mumbai's competitive food scene.",
  specialDishes: ["Butter Chicken", "Rogan Josh", "Truffle Risotto"],
  awards: ["Best Chef of the Year 2020", "Culinary Innovation Award 2019"],
  experience: 15,
  languages: ["Hindi", "English", "Marathi"],
  availability: {
    status: "available",
  },
  bookings: 250,
  satisfactionRate: 98,
};

const ChefProfilePage: React.FC = () => {
  const [guestCount, setGuestCount] = useState(1);
  const {
    isOpen: isNegotiateOpen,
    onOpen: onNegotiateOpen,
    onClose: onNegotiateClose,
  } = useDisclosure();
  const {
    isOpen: isChatOpen,
    onOpen: onChatOpen,
    onClose: onChatClose,
  } = useDisclosure();

  const bgColor = useColorModeValue("white", "gray.800");
  // const textColor = useColorModeValue("gray.800", "white");

  const calculateDynamicPrice = (basePrice: number, guests: number) => {
    return basePrice + (guests - 1) * 100;
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Box
        h="300px"
        bgImage={`url(${chef.coverImage})`}
        bgPosition="center"
        bgSize="cover"
        position="relative"
      >
        <Box
          position="absolute"
          bottom="-50px"
          left="50%"
          transform="translateX(-50%)"
        >
          <Image
            src={chef.image}
            alt={chef.name}
            boxSize="150px"
            objectFit="cover"
            borderRadius="full"
            border="4px solid white"
          />
        </Box>
      </Box>

      <Container maxW="container.xl" pt="70px" pb="50px">
        <VStack spacing={6} align="stretch">
          <Flex justifyContent="space-between" alignItems="center">
            <VStack align="start" spacing={2}>
              <Heading as="h1" size="2xl">
                {chef.name}
              </Heading>
              <HStack>
                {chef.categories.map((category) => (
                  <Badge key={category} colorScheme="purple">
                    {category}
                  </Badge>
                ))}
              </HStack>
            </VStack>
            <VStack align="end">
              <Badge
                colorScheme={
                  chef.availability.status === "available" ? "green" : "red"
                }
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {chef.availability.status === "available"
                  ? "Available Now"
                  : "Unavailable"}
              </Badge>
              {chef.availability.status === "unavailable" &&
                chef.availability.nextAvailable && (
                  <Text fontSize="sm" color="gray.500">
                    Next available: {chef.availability.nextAvailable}
                  </Text>
                )}
            </VStack>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>About</Tab>
                  <Tab>Experience</Tab>
                  <Tab>Pricing</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Text>{chef.bio}</Text>
                  </TabPanel>
                  <TabPanel>
                    <VStack align="start" spacing={4}>
                      <Text>
                        <strong>Years of Experience:</strong> {chef.experience}
                      </Text>
                      <Text>
                        <strong>Languages:</strong> {chef.languages.join(", ")}
                      </Text>
                      <Text>
                        <strong>Special Dishes:</strong>
                      </Text>
                      <SimpleGrid columns={2} spacing={2}>
                        {chef.specialDishes.map((dish) => (
                          <Badge key={dish} colorScheme="green">
                            {dish}
                          </Badge>
                        ))}
                      </SimpleGrid>
                      <Text>
                        <strong>Awards & Recognitions:</strong>
                      </Text>
                      <VStack align="start" spacing={1}>
                        {chef.awards.map((award) => (
                          <Text key={award}>🏆 {award}</Text>
                        ))}
                      </VStack>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack align="start" spacing={4}>
                      <Stat>
                        <StatLabel>Hourly Rate</StatLabel>
                        <StatNumber>${chef.price}/hr</StatNumber>
                        <StatHelpText>
                          Base price for up to 4 guests
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Monthly Package</StatLabel>
                        <StatNumber>${chef.monthlyFare}/month</StatNumber>
                        <StatHelpText>
                          Includes 20 meals for a family of 4
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Trial Session</StatLabel>
                        <StatNumber>${chef.trialCharges}</StatNumber>
                        <StatHelpText>
                          3-hour session for up to 4 guests
                        </StatHelpText>
                      </Stat>
                      <Box>
                        <Text fontWeight="bold" mb={2}>
                          Dynamic Pricing
                        </Text>
                        <HStack>
                          <Button
                            size="sm"
                            onClick={() =>
                              setGuestCount(Math.max(1, guestCount - 1))
                            }
                          >
                            -
                          </Button>
                          <Text>{guestCount} guests</Text>
                          <Button
                            size="sm"
                            onClick={() => setGuestCount(guestCount + 1)}
                          >
                            +
                          </Button>
                        </HStack>
                        <Text mt={2}>
                          Price for {guestCount} guests: $
                          {calculateDynamicPrice(chef.price, guestCount)}/hr
                        </Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <VStack spacing={6} align="stretch">
                <Flex justifyContent="space-between" alignItems="center">
                  <HStack>
                    <StarIcon color="yellow.400" />
                    <Text fontWeight="bold" fontSize="xl">
                      {chef.rating}
                    </Text>
                    <Text color="gray.500">({chef.totalReviews} reviews)</Text>
                  </HStack>
                  <Text fontWeight="bold">{chef.location}</Text>
                </Flex>

                <VStack spacing={2} align="stretch">
                  <Flex justifyContent="space-between">
                    <Text>Total Bookings</Text>
                    <Text fontWeight="bold">{chef.bookings}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text>Satisfaction Rate</Text>
                    <Text fontWeight="bold">{chef.satisfactionRate}%</Text>
                  </Flex>
                  <Progress
                    value={chef.satisfactionRate}
                    colorScheme="green"
                    size="sm"
                  />
                </VStack>

                <Divider />

                <VStack spacing={4}>
                  <Button
                    colorScheme="blue"
                    leftIcon={<CalendarIcon />}
                    w="full"
                  >
                    Book Now
                  </Button>
                  <Button
                    colorScheme="green"
                    leftIcon={<ChatIcon />}
                    w="full"
                    onClick={onChatOpen}
                  >
                    Chat with Chef
                  </Button>
                  <Button
                    colorScheme="orange"
                    w="full"
                    onClick={onNegotiateOpen}
                  >
                    Negotiate Price
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </SimpleGrid>

          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Recent Reviews
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {/* Add review components here */}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>

      {/* Negotiate Modal */}
      <Modal isOpen={isNegotiateOpen} onClose={onNegotiateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Negotiate Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* Add negotiation form or content here */}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onNegotiateClose}>
              Submit Offer
            </Button>
            <Button variant="ghost" onClick={onNegotiateClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Chat Modal */}
      <Modal isOpen={isChatOpen} onClose={onChatClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat with {chef.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* Add chat interface here */}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChefProfilePage;
