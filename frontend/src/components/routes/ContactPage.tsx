import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
  VStack,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IFormInputs } from "../type";

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Contact Us
        </Heading>
        <Text textAlign="center">
          Have a question or feedback? We'd love to hear from you!
        </Text>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="your@email.com"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.message}>
              <FormLabel>Message</FormLabel>
              <Textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Your message here..."
                minHeight="150px"
              />
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={isSubmitting}
              loadingText="Sending..."
            >
              Send Message
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Container>
  );
};

export default ContactPage;
