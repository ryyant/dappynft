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
        >
      <Box p="4">
        DappyNFT
      </Box>
      <Box p="4">
        About Us
      </Box>
      <Box p="4">
        RoadMap
      </Box>
      <Spacer />
      <ConnectWallet/>
    </Flex>
  );
}

export default Header;
