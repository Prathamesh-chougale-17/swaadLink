import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Text,
  VStack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Fade,
  ScaleFade,
  SlideFade,
  Wrap,
  WrapItem,
  Badge,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const categories = [
  "Maharashtrian",
  "North Indian",
  "South Indian",
  "Bengali",
  "Chinese",
  "Thai",
  "Turkish",
  "Mediterranean",
  "Italian",
  "French",
  "Mexican",
  "Spanish",
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (selectedCategory) {
      onOpen();
    }
  }, [selectedCategory, onOpen]);

  return (
    <Box minH="100vh" bgGradient="linear(to-b, orange.100, orange.300)">
      <Box
        h="70vh"
        bgImage="url('/chef.jpg')"
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
          <Fade in={true}>
            <Heading
              as="h1"
              size="2xl"
              color="white"
              mb={8}
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
            >
              Chef Cart
            </Heading>
          </Fade>
          <ScaleFade initialScale={0.9} in={true}>
            <Box w="full" maxW="md" px={4}>
              <Box position="relative">
                <Input
                  placeholder="Search by location, chef name, or cuisine"
                  bg="white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  pr="4rem"
                  borderRadius="full"
                  fontSize="lg"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
                    borderColor: "blue.300",
                  }}
                />
                <SearchIcon
                  position="absolute"
                  right="1.5rem"
                  top="50%"
                  transform="translateY(-50%)"
                  color="gray.400"
                  w={5}
                  h={5}
                />
              </Box>
            </Box>
          </ScaleFade>
        </Box>
      </Box>

      <Container maxW="container.xl" py={16}>
        <SlideFade in={true} offsetY="20px">
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Explore Culinary Adventures
          </Heading>
        </SlideFade>
        <SimpleGrid columns={[2, 3, 4, 6]} spacing={6}>
          {categories.map((category, index) => (
            <MotionBox
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                height="auto"
                py={6}
                px={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                bg="white"
                borderRadius="lg"
                boxShadow="md"
                transition="all 0.3s"
                onClick={() => setSelectedCategory(category)}
                _hover={{
                  bg: "orange.50",
                  boxShadow: "lg",
                }}
              >
                <Image
                  src={`/chef.jpg`}
                  alt={category}
                  boxSize="16"
                  borderRadius="full"
                  mb={3}
                />
                <Text fontWeight="medium" fontSize="lg">
                  {category}
                </Text>
              </Button>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCategory} Cuisine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>
                Discover talented chefs specializing in {selectedCategory}{" "}
                cuisine and more!
              </Text>
              <Text>
                Many of our chefs are experts in multiple cuisines, bringing you
                a world of flavors.
              </Text>
              <Wrap spacing={2}>
                <WrapItem>
                  <Badge colorScheme="purple">{selectedCategory}</Badge>
                </WrapItem>
                {categories
                  .filter((cat) => cat !== selectedCategory)
                  .slice(0, 3)
                  .map((cat) => (
                    <WrapItem key={cat}>
                      <Badge>{cat}</Badge>
                    </WrapItem>
                  ))}
                <WrapItem>
                  <Badge>+{categories.length - 4} more</Badge>
                </WrapItem>
              </Wrap>
              <Button colorScheme="orange" onClick={onClose}>
                Explore {selectedCategory} Chefs
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
