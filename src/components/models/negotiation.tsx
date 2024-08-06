import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Textarea,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
interface Chef {
  id: string;
  name: string;
  image: string;
  categories: string[];
  price: number;
  location: string;
  rating: number;
  bio: string;
  specialDishes: string[];
  awards: string[];
  monthlyFare: number;
  trialCharges: number;
  dynamicPricing: (people: number) => number;
  status: "active" | "unavailable";
  availability: {
    [key: string]: string[];
  };
}

const chef: Chef = {
  id: "1",
  name: "Chef Amit Kumar",
  image: "/chef-amit.jpg",
  categories: ["North Indian", "Mughlai", "Continental"],
  price: 800,
  location: "Mumbai, India",
  rating: 4.8,
  bio: "With over 15 years of culinary experience, Chef Amit Kumar brings the rich flavors of North India and the finesse of Continental cuisine to your table. His innovative fusion dishes have earned him acclaim in Mumbai's competitive food scene.",
  specialDishes: ["Butter Chicken", "Rogan Josh", "Truffle Risotto"],
  awards: ["Best Chef of the Year 2020", "Culinary Innovation Award 2019"],
  monthlyFare: 15000,
  trialCharges: 1000,
  dynamicPricing: (people: number) => 800 + people * 100,
  status: "active",
  availability: {
    Monday: ["10:00 AM - 2:00 PM", "6:00 PM - 10:00 PM"],
    Tuesday: ["10:00 AM - 2:00 PM", "6:00 PM - 10:00 PM"],
    Wednesday: ["10:00 AM - 2:00 PM", "6:00 PM - 10:00 PM"],
    Thursday: ["10:00 AM - 2:00 PM", "6:00 PM - 10:00 PM"],
    Friday: ["10:00 AM - 2:00 PM", "6:00 PM - 10:00 PM"],
    Saturday: ["11:00 AM - 3:00 PM", "7:00 PM - 11:00 PM"],
    Sunday: ["11:00 AM - 3:00 PM", "7:00 PM - 11:00 PM"],
  },
};
const Negotiation = () => {
  const [isNegotiating, setIsNegotiating] = React.useState(false);
  const [negotiatedPrice, setNegotiatedPrice] = React.useState(0);
  return (
    <Modal isOpen={isNegotiating} onClose={() => setIsNegotiating(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Negotiate Price with {chef.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>Current price: ${chef.price}/hr</Text>
            <Text>Your offer: ${negotiatedPrice}/hr</Text>
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
  );
};

export default Negotiation;
