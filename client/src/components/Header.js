import { Box, Flex, Spacer } from "@chakra-ui/react";
import ConnectWallet from './ConnectWallet.js';

function Header() {
  return (
    <Flex 
        as="nav" 
        align="center" 
        justify="space-between" 
        wrap="wrap" 
        w="100%" 
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        color='white'
        paddingLeft={6}
        >
      <Box p="4" fontSize={20} color='black' fontWeight='semibold'>
        dappyNFT
      </Box>
      <Box p="4">
        About Us
      </Box>
      <Box p="4">
        RoadMap
      </Box>
      <Box p="4">
        Request
      </Box>
      <Spacer />
      <ConnectWallet/>
    </Flex>
  );
}

export default Header;
