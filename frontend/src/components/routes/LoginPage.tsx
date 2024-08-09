import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

const LoginPage = () => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <Box minH="100vh" bg="gray.100" py={10}>
      <Container maxW="md" bg="white" boxShadow="md" rounded="lg" p={8}>
        <VStack spacing={4} align="flex-start" w="full">
          <Heading>Login to Swaad Link</Heading>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4} align="flex-start" w="full">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" />
              </FormControl>
              <Button type="submit" colorScheme="blue" w="full">
                Log In
              </Button>
            </VStack>
          </form>
          <Text align="center" w="full">
            Don't have an account?{" "}
            <Link color="blue.500" href="#">
              Sign up
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;
