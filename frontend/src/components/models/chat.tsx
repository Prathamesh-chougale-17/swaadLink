import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  ModalFooter,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";

const Chat = ({ name }: { name: string }) => {
  const [isChatting, setIsChatting] = React.useState(false);

  return (
    <Modal isOpen={isChatting} onClose={() => setIsChatting(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chat with {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch" h="300px" overflowY="auto">
            {/* Mock chat messages */}
            <Box alignSelf="flex-end" bg="blue.100" p={2} borderRadius="md">
              Hello, I'm interested in booking you for an event.
            </Box>
            <Box alignSelf="flex-start" bg="gray.100" p={2} borderRadius="md">
              Hi there! I'd be happy to discuss your event. What kind of cuisine
              are you looking for?
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Input placeholder="Type your message..." mr={3} />
          <Button colorScheme="blue">Send</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Chat;
