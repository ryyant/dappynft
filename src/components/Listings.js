import { Container, Wrap, Box, CircularProgress, Center } from "@chakra-ui/react";
import Card from "./Card";
import { useState, useEffect } from "react";

function Listings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const links = [
    "https://api.opensea.io/api/v1/asset/0x13015585932752A8e6Dc24bE6c07c420381AF53d/1077/", //ireneDAO
    //'https://api.opensea.io/api/v1/asset/0x13015585932752A8e6Dc24bE6c07c420381AF53d/242/', //ireneDAO
    "https://api.opensea.io/api/v1/asset/0x13015585932752A8e6Dc24bE6c07c420381AF53d/982/", //ireneDAO
    "https://api.opensea.io/api/v1/asset/0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B/1875/",
    "https://api.opensea.io/api/v1/asset/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/2180/",
    "https://api.opensea.io/api/v1/asset/0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69/11061/",
    "https://api.opensea.io/api/v1/asset/0x71d106ba5283260467a3caff59de9e5bceb9f444/2205/", // black guy at casino
    "https://api.opensea.io/api/v1/asset/0xc3f733ca98E0daD0386979Eb96fb1722A1A05E69/23394/", //mooncat
    "https://api.opensea.io/api/v1/asset/0x0811F26C17284B6E331Beaa2328471107576e601/850/",
    "https://api.opensea.io/api/v1/asset/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/2517/",
  ];

  useEffect(() => {
    const fetchItem = async () => {
      const nfts = await fetchNft();
      console.log(nfts);
      setItems(nfts);
      setLoading(false);
    };
    fetchItem();
  }, []);

  //Fetch
  const fetchNft = async () => {
    const array = [];
    for (let i = 0; i < links.length; i++) {
      const res = await fetch(links[i]);
      const data = await res.json();
      array.push(data);
      console.log(array);
      setProgress((progress) => progress + 1);
    }

    return array;
  };

  return (
    <Box color="white">
      <Container maxW="container.xl" centerContent> 
        <Wrap>
          {loading === false && items.map((info) => <Card item={info} />)}
          {loading === true && (
              <CircularProgress
                value={progress}
                color="pink.400"
                thickness="10px"
                size="120px"
                max={links.length}
                p={50}
              />
          )}
        </Wrap>
      </Container>
    </Box>
  );
}

export default Listings;
