import { Box, Image, Badge, Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardDetails from "./CardDetails";

function Card({ item }) {
  return (
    <Box maxW="60" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box h={280}>
      <Image src={item.image_url}/>
      </Box>
          
          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal' maxW={100}>
                <Text isTruncated>
                {item.collection.name}
                </Text>
              </Badge>
            </Box>

            <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
              {item.name}
            </Box>

            <Box>
              {(item.orders[0].base_price/1000000000000000000).toFixed(2)}
              <Box as='span' color='gray.600' fontSize='sm'>
                ETH
              </Box>
            </Box>

            <Box display='flex' mt='2' alignItems='center'>
              <CardDetails nft = {item}/>
            </Box>
          </Box>
    </Box>
  );
}

export default Card;
   