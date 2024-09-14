import React, { useState } from "react";
import * as _chakra_ui_system from "@chakra-ui/system";
import * as _chakra_ui_icon from "@chakra-ui/icon";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
  Link,
} from "@chakra-ui/react";
import { SearchIcon, StarIcon, TimeIcon, ChatIcon } from "@chakra-ui/icons";
import { FaUtensils } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const FeatureCardDetail = [
  {
    icon: StarIcon,
    title: "Top-rated Chefs",
    description: "Connect with the best culinary talents in your area.",
  },
  {
    icon: TimeIcon,
    title: "Flexible Bookings",
    description: "Choose from one-time events to regular meal preparations.",
  },
  {
    icon: ChatIcon,
    title: "Direct Communication",
    description: "Chat with chefs to customize your perfect dining experience.",
  },
];

const categories = [
  { name: "Maharashtrian", icon: FaUtensils },
  { name: "North Indian", icon: FaUtensils },
  { name: "South Indian", icon: FaUtensils },
  { name: "Bengali", icon: FaUtensils },
  { name: "Chinese", icon: FaUtensils },
  { name: "Thai", icon: FaUtensils },
  { name: "Turkish", icon: FaUtensils },
  { name: "Mediterranean", icon: FaUtensils },
  { name: "Italian", icon: FaUtensils },
  { name: "French", icon: FaUtensils },
  { name: "Mexican", icon: FaUtensils },
  { name: "Spanish", icon: FaUtensils },
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const bgColor = useColorModeValue("orange.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box
        h="80vh"
        bgImage="url('/hero-image.jpg')"
        bgPosition="center"
        bgSize="cover"
        position="relative"
      >
        <Box
          position="absolute"
          inset="0"
          bg="blackAlpha.600"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <VStack
            spacing={8}
            alignItems="center"
            maxW="800px"
            textAlign="center"
          >
            <Heading
              as="h1"
              size="4xl"
              color="white"
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
              fontWeight="bold"
            >
              Swaad Link
            </Heading>
            <Text fontSize="2xl" color="white" fontWeight="medium">
              Discover extraordinary chefs for your culinary adventures
            </Text>
            <Box w="full" maxW="md" px={4}>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search by location, chef name, or cuisine"
                  bg="white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  borderRadius="full"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                    borderColor: "blue.300",
                  }}
                />
              </InputGroup>
            </Box>
            <Button
              as={RouterLink}
              to="/chefs"
              size="lg"
              colorScheme="orange"
              rightIcon={<SearchIcon />}
              borderRadius="full"
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            >
              Find Your Chef
            </Button>
          </VStack>
        </Box>
      </Box>

      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <Heading as="h2" size="2xl" textAlign="center">
            Explore Culinary Adventures
          </Heading>
          <SimpleGrid columns={[2, 3, 4, 6]} spacing={8}>
            <AnimatePresence>
              {categories.map((category, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    as={RouterLink}
                    to={`/chefs?category=${category.name}`}
                    _hover={{ textDecoration: "none" }}
                  >
                    <VStack
                      bg={cardBgColor}
                      p={6}
                      borderRadius="lg"
                      boxShadow="md"
                      transition="all 0.3s"
                      _hover={{
                        transform: "translateY(-5px)",
                        boxShadow: "xl",
                      }}
                      cursor="pointer"
                    >
                      <Icon
                        as={category.icon}
                        w={10}
                        h={10}
                        color="orange.500"
                      />
                      <Text fontWeight="medium" fontSize="lg">
                        {category.name}
                      </Text>
                    </VStack>
                  </Link>
                </MotionBox>
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </VStack>
      </Container>

      <Box bg={useColorModeValue("gray.100", "gray.700")} py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, null, 3]} spacing={10}>
            {FeatureCardDetail.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

const FeatureCard: React.FC<{
  icon: _chakra_ui_system.ComponentWithAs<"svg", _chakra_ui_icon.IconProps>;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <VStack
    bg={useColorModeValue("white", "gray.800")}
    p={8}
    borderRadius="lg"
    boxShadow="md"
    align="start"
    spacing={4}
  >
    <Icon as={icon} w={10} h={10} color="orange.500" />
    <Heading as="h3" size="lg">
      {title}
    </Heading>
    <Text>{description}</Text>
  </VStack>
);

export default Home;
