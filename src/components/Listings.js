import { Container, Wrap, Box} from '@chakra-ui/react'
import Card from './Card';

function Listings() {

    const objects = [1,2,3,4,5,6,7,8,9,10,11,12,13]

    return (
    <Box bg='black' color='white'>
      <Container maxW='container.xl'>
          <Wrap>
            {objects.map(x => <Card/>)} 
          </Wrap>
      </Container>
    </Box>
    );
  }
  
  export default Listings;
  