import Header from './components/Header';
import Listings from './components/Listings';
import { Box } from '@chakra-ui/react';
import Title from './components/Title';
import React, { Component } from "react";

import "./App.css";

class App extends Component {

  render() {
    return (
      <Box bgColor='black'>
      <Header/>
      {/* <Heading color='white'> The stored value is: {this.state.accounts} </Heading> */}
      <Title/>
      <Listings/>
    </Box>
    );
  }
}

export default App;
