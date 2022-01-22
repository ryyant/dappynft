import logo from './logo.svg';
import './App.css';
import WalletCardEthers from'./WalletCardEthers';
import Header from './components/Header';
import Listings from './components/Listings';
import { Heading, Box } from '@chakra-ui/react';
import Title from './components/Title';

function App() {

  return (
    <Box bgColor='black'>
      <Header/>
      <Title/>
      <Listings/>
    </Box>
  );
}

export default App;
