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
  Heading,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { doc, setDoc, updateDoc, getDoc, increment } from 'firebase/firestore';
import db from '../config/firebase.js';

function CardDetails({ nft }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);
  const [userContribution, setUserContribution] = useState(0);
  const [isInputError, setIsInputError] = useState(false);
  const nftPrice = nft.orders[0].base_price / 1000000000000000000;

  // const handleConnectWallet = async () => {
  //   console.log('Connecting Metamask...');
  //   const provider = window.ethereum;
  //   const accounts = await provider.request({ method: 'eth_requestAccounts' });
  //   const account = accounts[0];
  //   console.log(account);
  //   setDefaultAccount(account);
  // };

  const handleInput = (event) => setInput(event.target.value);

  //Handles submitting of contribution form.
  //Checks if the amount the user wants to contributes exceeds the total price of the NFT
  //Updates total contribution, progress and user's contribution in the database
  const onSubmit = async (contribution, account) => {
    const userConRef = doc(db, nft.name, account);
    const userConSnap = await getDoc(userConRef);
    const totalConRef = doc(db, nft.name, 'contributions');

    setIsInputError(false);

    const amountNeeded = nftPrice - totalContributions;
    if (amountNeeded < contribution) {
      setIsInputError(true);
      return;
    }

    if (!userConSnap.exists()) {
      await setDoc(userConRef, {
        amount: parseFloat(contribution),
      });
    } else {
      await updateDoc(userConRef, {
        amount: increment(parseFloat(contribution)),
      });
    }

    await updateDoc(totalConRef, {
      progress: increment(parseFloat(contribution)),
    });

    const totalContributionData = await fetchTotalContributions();
    const userContributionData = await fetchUserContribution();
    setTotalContributions(totalContributionData.progress);
    setUserContribution(userContributionData.amount);
    setInput('');
  };

  // Fetch total contribution and progress of this NFT
  const fetchTotalContributions = async () => {
    const contributionsRef = doc(db, nft.name, 'contributions');
    const refSnap = await getDoc(contributionsRef);

    if (!refSnap.exists()) {
      await setDoc(contributionsRef, {
        total: parseFloat(nftPrice),
        progress: parseFloat(0),
      });
    } else {
      await updateDoc(contributionsRef, {
        total: parseFloat(nftPrice),
      });
    }

    const newSnap = await getDoc(contributionsRef);
    return newSnap.data();
  };

  // Fetch user's contribution to this NFT
  const fetchUserContribution = async () => {
    const contributionRef = doc(db, nft.name, 'walletIdPlaceholder');
    const refSnap = await getDoc(contributionRef);

    if (!refSnap.exists()) {
      return { amount: 0 };
    }
    console.log(refSnap.data());
    return refSnap.data();
  };

  useEffect(() => {
    const fetch = async () => {
      const totalContributionData = await fetchTotalContributions();
      const userContributionData = await fetchUserContribution();
      setTotalContributions(totalContributionData.progress);
      setUserContribution(userContributionData.amount);
    };
    fetch();
  }, []);

  return (
    <Box>
      <Button onClick={onOpen} colorScheme='pink' variant='outline'>
        View NFT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{nft.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={nft.image_url} />
            <Divider />
            <Heading py={5}> Price: {nftPrice} ETH</Heading>
            <Text>{nft.description}</Text>
            <HStack mt={10} spacing={20}>
              <Text>Total Contributions: {totalContributions} </Text>
              <Text>Your Contribution: {userContribution} </Text>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <FormControl isInvalid={isInputError}>
              <Input variant='outline' placeholder='Amount' mr={10} value={input} type='number' onChange={(e) => handleInput(e)} />
              {isInputError && <FormErrorMessage>Your contribution exceeds amount needed to purchase.</FormErrorMessage>}
            </FormControl>
            <Button
              colorScheme='pink'
              variant='outline'
              onClick={() => {
                onSubmit(input, 'walletIdPlaceholder');
              }}
              pl={8}
              pr={8}
              mr={4}
              _hover={{ bg: '#FF0080', textColor: 'white' }}
            >
              Contribute
            </Button>
            <Button variant='ghost' pl={8} pr={8} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CardDetails;
