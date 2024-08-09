import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const contributors = [
  {
    name: "Prathamesh Chougale",
    role: "Full Stack Developer",
    image: "/chef.jpg",
    github: "https://github.com/Prathamesh-chougale-17",
    linkedin: "https://www.linkedin.com/in/prathamesh-chougale/",
  },
  {
    name: "Uday Berad",
    role: "UI/UX Designer",
    image: "/chef.jpg",
    github: "https://github.com/Uday-Berad22",
    linkedin: "https://www.linkedin.com/in/uday-berad-108661238/",
  },
  {
    name: "Sushant Bansode",
    role: "Backend Developer",
    image: "/chef.jpg",
    github: "https://github.com/Sushant-Bansode",
    linkedin: "https://www.linkedin.com/in/sushantbansode/",
  },
  {
    name: "Atharv Bhadange",
    role: "Backend Developer",
    image: "/chef.jpg",
    github: "https://github.com/atharv1809",
    linkedin: "https://www.linkedin.com/in/atharv-bhadange21/",
  },
  // Add more contributors as needed
];

const AboutUsPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");

  return (
    <Box bg={bgColor} minH="100vh" py={16}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              About Swaad Link
            </Heading>
            <Text fontSize="xl" maxW="2xl" mx="auto">
              Connecting food lovers with talented chefs for unforgettable
              culinary experiences
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as="h2" size="xl" mb={4}>
                Our Mission
              </Heading>
              <Text fontSize="lg">
                At Swaad Link, we believe that great food has the power to bring
                people together and create lasting memories. Our mission is to
                make it easy for food enthusiasts to discover and connect with
                talented chefs in their area, enabling unique dining experiences
                that celebrate culinary creativity and cultural diversity.
              </Text>
            </Box>
            <Box>
              <Image
                src="/chef.jpg"
                alt="Chef cooking"
                borderRadius="md"
                objectFit="cover"
                w="600"
                h="400"
              />
            </Box>
          </SimpleGrid>

          <Box>
            <Heading as="h2" size="xl" mb={8} textAlign="center">
              Meet Our Team
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {contributors.map((contributor) => (
                <Box
                  key={contributor.name}
                  bg={cardBgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Image
                    src={contributor.image}
                    alt={contributor.name}
                    borderRadius="full"
                    boxSize="150px"
                    mx="auto"
                    mb={4}
                  />
                  <Heading as="h3" size="md" mb={2}>
                    {contributor.name}
                  </Heading>
                  <Text color="gray.500" mb={4}>
                    {contributor.role}
                  </Text>
                  <HStack justify="center" spacing={4}>
                    <Icon
                      as={FaGithub}
                      boxSize={6}
                      color="gray.600"
                      _hover={{ color: "blue.500" }}
                      cursor="pointer"
                      onClick={() => window.open(contributor.github, "_blank")}
                    />
                    <Icon
                      as={FaLinkedin}
                      boxSize={6}
                      color="gray.600"
                      _hover={{ color: "blue.500" }}
                      cursor="pointer"
                      onClick={() =>
                        window.open(contributor.linkedin, "_blank")
                      }
                    />
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutUsPage;
