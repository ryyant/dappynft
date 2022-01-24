import { Text, Box } from "@chakra-ui/react";

function Title() {
  return (
    <Box
    textAlign="flex-start"
    p='8'>
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        ml={20}
      >
        dappyNFT
      </Text>
      <Text
        bg='white'
        bgClip="text"
        fontSize="4xl"
        fontWeight="bold"
        ml={20}
      >
        NFTs made Affordable for Everyone.
      </Text>
    </Box>
  );
}

export default Title;
