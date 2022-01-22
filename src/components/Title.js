import { Text, Box } from "@chakra-ui/react";

function Title() {
  return (
    <Box
    textAlign="flex-start">
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        m={10}
      >
        dappyNFT
      </Text>
    </Box>
  );
}

export default Title;
