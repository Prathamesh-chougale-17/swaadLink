import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "react-select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Define the cuisine options
const cuisineOptions = [
  { value: "italian", label: "Italian" },
  { value: "indian", label: "Indian" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "french", label: "French" },
  { value: "thai", label: "Thai" },
  { value: "mediterranean", label: "Mediterranean" },
];

// Define the Zod schema for form validation
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  specialties: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "Please select at least one specialty"),
  experience: z.number().min(0, "Experience must be a positive number"),
  hourlyRate: z.number().min(1, "Hourly rate must be at least 1"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  location: z.string().min(2, "Location is required"),
  profileImage: z
    .any()
    .refine((files) => files?.length == 1, "Profile image is required."),
});

type FormData = z.infer<typeof schema>;

const MotionBox = motion(Box);

const ChefRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: "Registration Submitted",
      description: "We've received your application. We'll be in touch soon!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxWidth="600px"
      margin="auto"
      padding={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Chef Registration
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...register("name")}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+1" />
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                {...register("phone")}
              />
            </InputGroup>
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.specialties}>
            <FormLabel htmlFor="specialties">Culinary Specialties</FormLabel>
            <Controller
              name="specialties"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={cuisineOptions}
                  placeholder="Select your specialties"
                />
              )}
            />
            <FormErrorMessage>{errors.specialties?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.experience}>
            <FormLabel htmlFor="experience">Years of Experience</FormLabel>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <NumberInput
                  min={0}
                  onChange={(valueString) => {
                    field.onChange(parseInt(valueString));
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.hourlyRate}>
            <FormLabel htmlFor="hourlyRate">Hourly Rate ($)</FormLabel>
            <Controller
              name="hourlyRate"
              control={control}
              render={({ field }) => (
                <NumberInput
                  min={1}
                  onChange={(valueString) => {
                    field.onChange(parseInt(valueString));
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            <FormErrorMessage>{errors.hourlyRate?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.bio}>
            <FormLabel htmlFor="bio">Chef Bio</FormLabel>
            <Textarea
              id="bio"
              placeholder="Tell us about your culinary journey and expertise (minimum 50 characters)"
              {...register("bio")}
            />
            <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.location}>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              placeholder="City, State"
              {...register("location")}
            />
            <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.profileImage}>
            <FormLabel htmlFor="profileImage">Profile Image</FormLabel>
            <Input
              type="file"
              id="profileImage"
              accept="image/*"
              {...register("profileImage")}
            />
            <FormErrorMessage>
              {errors.profileImage?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={false}
            type="submit"
            size="lg"
            width="full"
          >
            Register as a Chef
          </Button>
        </VStack>
      </form>
    </MotionBox>
  );
};

export default ChefRegistrationForm;
