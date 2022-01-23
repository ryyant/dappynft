import { 
  Button,
  Box, 
  Modal, 
  Text, 
  Image, 
  Input, 
  Spacer, 
  ModalOverlay, 
  ModalHeader, 
  ModalCloseButton, 
  Divider, 
  ModalContent, 
  ModalBody, 
  ModalFooter, 
  useDisclosure, 
  Heading
} from "@chakra-ui/react";
import { useState } from "react";
import { submitContribution as onSubmit } from '../config/firebase.js'
import { ethers } from "ethers";
import { doc, updateDoc } from "firebase/firestore"
import db from "../config/firebase.js"

function CardDetails({nft}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [input, setInput] = useState('');
    const handleInput = (event) => setInput(event.target.value);
    const [defaultAccount, setDefaultAccount] = useState(null);

    const handleConnectWallet = async () => {
      console.log("Connecting Metamask...");
      const provider = window.ethereum;
      const accounts = await provider.request({method:'eth_requestAccounts'})
      const account = accounts[0];
      console.log(account);
      setDefaultAccount(account);
    };

    const onSubmit = async (contribution, account) => {
      const contributionsRef = doc(db, nft.name, "contributors")
      console.log(contribution) // ran
      console.log(db)
    
      await updateDoc(contributionsRef, {
      [account] : contribution
      }) // error
    }

    return (
      <Box>
        <Button onClick={onOpen} colorScheme='pink' variant='outline'>View NFT</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{nft.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Image src={nft.image_url} />
            <Divider/>
              <Heading>
                Price: {(nft.orders[0].base_price/1000000000000000000).toFixed(2)} ETH
              </Heading>
              <Text>
                {nft.description}
              </Text>
            </ModalBody>
  
            <ModalFooter>
            <Input variant='outline' placeholder='Amount' mr={10} value={input} onChange={handleInput} />
              <Button colorScheme='pink' variant='outline' onClick={() => {onSubmit(input, defaultAccount ); handleConnectWallet() }} pl={8} pr={8} mr={4} _hover={{ bg: '#FF0080', textColor: "white" }}>
                Contribute
              </Button>
              <Button variant='ghost' pl={8} pr={8} onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
  }

export default CardDetails;