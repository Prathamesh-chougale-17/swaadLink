import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Button,
  Textarea,
  Flex,
  Avatar,
  Wrap,
  WrapItem,
  useToast,
  Divider,
  SimpleGrid,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface CommentsProps {
  id: number;
  user: string;
  rating: number;
  text: string;
  date: string;
}

const ChefProfilePage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentsProps[]>([]);
  const toast = useToast();
  //   const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");

  // Mock chef data
  const chefs = {
    id: "1",
    name: "Chef Amit Kumar",
    image: "/chef.jpg",
    categories: ["North Indian", "Mughlai", "Continental"],
    price: 800,
    location: "Mumbai, India",
    rating: 4.8,
    bio: "With over 15 years of culinary experience, Chef Amit Kumar brings the rich flavors of North India and the finesse of Continental cuisine to your table. His innovative fusion dishes have earned him acclaim in Mumbai's competitive food scene.",
    specialDishes: ["Butter Chicken", "Rogan Josh", "Truffle Risotto"],
    awards: ["Best Chef of the Year 2020", "Culinary Innovation Award 2019"],
  };

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

  const handleRating = (newRating: React.SetStateAction<number>) => {
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

  return (
    <Container maxW="container.xl" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex direction={{ base: "column", md: "row" }} align="start" mb={8}>
          <Image
            src={chefs.image}
            alt={chefs.name}
            borderRadius="lg"
            objectFit="cover"
            maxW={{ base: "100%", md: "300px" }}
            mr={{ md: 8 }}
            mb={{ base: 4, md: 0 }}
          />
          <Box>
            <Heading as="h1" size="2xl" mb={2}>
              {chefs.name}
            </Heading>
            <Wrap spacing={2} mb={4}>
              {chefs.categories.map((category) => (
                <WrapItem key={category}>
                  <Badge colorScheme="purple">{category}</Badge>
                </WrapItem>
              ))}
            </Wrap>
            <HStack spacing={4} mb={4}>
              <Badge
                colorScheme="green"
                fontSize="md"
                p={2}
                borderRadius="full"
              >
                ⭐ {chefs.rating.toFixed(1)}
              </Badge>
              <Text fontWeight="bold">${chefs.price}/hr</Text>
              <Text>{chefs.location}</Text>
            </HStack>
            <Text mb={4}>{chefs.bio}</Text>
            <HStack spacing={4}>
              <Button leftIcon={<PhoneIcon />} colorScheme="blue">
                Contact
              </Button>
              <Button leftIcon={<EmailIcon />} colorScheme="green">
                Book Now
              </Button>
            </HStack>
          </Box>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Specialties
            </Heading>
            <VStack align="start" spacing={2}>
              {chefs.specialDishes.map((dish) => (
                <Text key={dish}>• {dish}</Text>
              ))}
            </VStack>
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Awards & Recognitions
            </Heading>
            <VStack align="start" spacing={2}>
              {chefs.awards.map((award) => (
                <Text key={award}>🏆 {award}</Text>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        <Divider my={8} />

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
          {comments.map((comment) => (
            <MotionBox
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default ChefProfilePage;
