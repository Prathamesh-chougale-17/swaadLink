import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Textarea,
  SliderThumb,
  Input,
  Avatar,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { StarIcon, ChatIcon, CalendarIcon } from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { Chef } from "../type";
import { getChefById } from "../../services/api";
import LoadingComponent from "../global/Loading";

const MotionBox = motion(Box);

interface Comment {
  id: number;
  user: string;
  rating: number;
  text: string;
  date: string;
}

const ChefProfilePage: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const { id } = useParams<{ id: string }>();
  // const textColor = useColorModeValue("gray.800", "white");

  const calculateDynamicPrice = (
    basePrice: number,
    guests: number,
    extraPersonCharges: number
  ) => {
    return basePrice + (guests - 1) * extraPersonCharges;
  };
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [negotiatedPrice, setNegotiatedPrice] = useState(0);
  const toast = useToast();
  const cardBgColor = useColorModeValue("white", "gray.700");
  const [isLoading, setIsLoading] = useState(true);
  const [chef, setChef] = useState<Chef | null>(null);
  const boxBg = useColorModeValue("gray.50", "gray.900");

  useEffect(() => {
    const fetchChefData = async () => {
      setIsLoading(true);
      try {
        if (id === undefined) {
          return;
        }
        const chefData = await getChefById(id);
        setChef(chefData);
      } catch (error) {
        console.error("Error fetching chef data:", error);
        toast({
          title: "Error fetching chef data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchChefData();
  }, [id, toast]);

  useEffect(() => {
    // Mock API call to fetch comments
    setComments([
      {
        id: 1,
        user: "Priya S.",
        rating: 5,
        text: "Amazing experience! Chef Amit's butter chicken is to die for.",
        date: "2023-05-15",
      },
      {
        id: 2,
        user: "Rahul M.",
        rating: 4,
        text: "Great fusion of flavors. Loved the truffle risotto.",
        date: "2023-05-10",
      },
    ]);
  }, []);

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleCommentSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating before submitting your comment.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newComment = {
      id: comments.length + 1,
      user: "You",
      rating,
      text: comment,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([newComment, ...comments]);
    setComment("");
    setRating(0);
    toast({
      title: "Comment submitted",
      description: "Thank you for your feedback!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (!chef) {
    return <div>Chef not found</div>;
  }
  const handleNegotiate = () => {
    setIsNegotiating(true);
    setNegotiatedPrice(chef.price);
  };

  const handleChat = () => {
    setIsChatting(true);
  };

  return (
    <Box bg={boxBg}>
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
                colorScheme={chef.status === "active" ? "green" : "red"}
                fontSize="lg"
                px={3}
                py={1}
                borderRadius="full"
              >
                {chef.status === "active" ? "Available Now" : "Unavailable"}
              </Badge>
              {chef.status === "unavailable" &&
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
                        <StatNumber>${chef.price}/session</StatNumber>
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
                          {calculateDynamicPrice(
                            chef.price,
                            guestCount,
                            chef.extraPersonCharges
                          )}
                          /session
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
                    onClick={handleChat}
                  >
                    Chat with Chef
                  </Button>
                  <Button
                    colorScheme="orange"
                    w="full"
                    onClick={handleNegotiate}
                  >
                    Negotiate Price
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </SimpleGrid>

          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Customer Reviews
            </Heading>

            <Box mb={8}>
              <Heading as="h3" size="lg" mb={4}>
                Leave a Review
              </Heading>
              <HStack spacing={2} mb={4}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconButton
                    key={star}
                    icon={<StarIcon />}
                    onClick={() => handleRating(star)}
                    color={star <= rating ? "yellow.400" : "gray.300"}
                    aria-label={`Rate ${star} stars`}
                  />
                ))}
              </HStack>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with Chef Amit Kumar..."
                mb={4}
              />
              <Button colorScheme="blue" onClick={handleCommentSubmit}>
                Submit Review
              </Button>
            </Box>

            <VStack spacing={4} align="stretch">
              <AnimatePresence>
                {comments.map((comment) => (
                  <MotionBox
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      borderWidth={1}
                      borderRadius="lg"
                      p={4}
                      bg={cardBgColor}
                      boxShadow="md"
                    >
                      <Flex justify="space-between" mb={2}>
                        <HStack>
                          <Avatar size="sm" name={comment.user} />
                          <Text fontWeight="bold">{comment.user}</Text>
                        </HStack>
                        <HStack>
                          <StarIcon color="yellow.400" />
                          <Text>{comment.rating}/5</Text>
                        </HStack>
                      </Flex>
                      <Text mb={2}>{comment.text}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {comment.date}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </AnimatePresence>
            </VStack>
          </Box>
        </VStack>
      </Container>

      {/* Negotiate Modal */}
      <Modal isOpen={isNegotiating} onClose={() => setIsNegotiating(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Negotiate Price with {chef.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>Current price: ${chef.price}/session</Text>
              <Text>Your offer: ${negotiatedPrice}/session</Text>
              <Slider
                min={Math.floor(chef.price * 0.7)}
                max={Math.ceil(chef.price * 1.3)}
                step={10}
                value={negotiatedPrice}
                onChange={(value) => setNegotiatedPrice(value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Textarea placeholder="Add a message to support your offer (optional)" />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Send Offer
            </Button>
            <Button variant="ghost" onClick={() => setIsNegotiating(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Chat Modal */}
      <Modal isOpen={isChatting} onClose={() => setIsChatting(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat with {chef.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch" h="300px" overflowY="auto">
              {/* Mock chat messages */}
              <Box alignSelf="flex-end" bg="blue.100" p={2} borderRadius="md">
                Hello, I'm interested in booking you for an event.
              </Box>
              <Box alignSelf="flex-start" bg="gray.100" p={2} borderRadius="md">
                Hi there! I'd be happy to discuss your event. What kind of
                cuisine are you looking for?
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Input placeholder="Type your message..." mr={3} />
            <Button colorScheme="blue">Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChefProfilePage;
