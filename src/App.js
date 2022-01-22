import logo from './logo.svg';
import './App.css';
import WalletCardEthers from'./WalletCardEthers';
import Header from './components/Header';
import AirbnbExample from './components/Box';

function App() {

  return (
    <div className="App">
{/*       <Header/> */}
      <WalletCardEthers/>
      <AirbnbExample/>
      <AirbnbExample/>
      <AirbnbExample/>
      <AirbnbExample/>
    </div>
  );
}

export default App;
