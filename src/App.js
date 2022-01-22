import Header from './components/Header';
import Listings from './components/Listings';
import { Box, Image } from '@chakra-ui/react';
import Title from './components/Title';
import BlueMoonCat from './assets/bluemooncat.png';

function App() {
  return (
    <Box bgColor='black'>
      <Header/>
{/*       <Image src={BlueMoonCat} 
      alt='Blue MoonCat' 
      pos="absolute"
      top="10"
      left='10'
      /> */}
      <Title/>
      <Listings/>
    </Box>
  );
}

export default App;
