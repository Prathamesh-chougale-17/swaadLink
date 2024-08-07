import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChefWithDistance } from "../type";

const ChefCard: React.FC<{ chef: ChefWithDistance }> = ({ chef }) => (
  <Card maxW="sm" boxShadow="md" borderRadius="lg">
    <CardBody>
      <Image src={`/chef.jpg`} alt={chef.name} borderRadius="lg" />
      <Stack mt="6" spacing="3">
        <Heading size="md">{chef.name}</Heading>
        <Flex wrap="wrap" gap={1}>
          {chef.categories.map((category) => (
            <Badge key={category} colorScheme="blue">
              {category}
            </Badge>
          ))}
        </Flex>
        <Text>Rating: {chef.rating} ⭐</Text>
        <Text color="blue.600" fontSize="2xl">
          ${chef.price}/hr
        </Text>
        <Text fontSize="sm">Distance: {chef.distance.toFixed(2)} km</Text>
      </Stack>
    </CardBody>
    <Divider />
    <Flex justify="center" p={4}>
      <Button colorScheme="blue">Book Now</Button>
    </Flex>
  </Card>
);

export default ChefCard;
