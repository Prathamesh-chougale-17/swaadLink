import React from "react";
import { Box, Flex, Text, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingComponent: React.FC = () => {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bg="gray.50"
    >
      <Box
        as={motion.div}
        animation={`${spin} 1s linear infinite`}
        width="80px"
        height="80px"
        border="4px solid"
        borderColor="blue.500"
        borderTopColor="transparent"
        borderRadius="50%"
        mb={4}
      />
      <Text fontSize="xl" fontWeight="bold" color="blue.500">
        Loading Chefs...
      </Text>
      <Text fontSize="md" color="gray.500" mt={2}>
        Preparing a culinary experience just for you
      </Text>
    </Flex>
  );
};

export default LoadingComponent;
