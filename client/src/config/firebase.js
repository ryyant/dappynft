import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from 'firebase/firestore'
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC9HCaFGTJKo1ifTcRbHOwF-oM1Mz58gVo',
  authDomain: 'dappynft.firebaseapp.com',
  projectId: 'dappynft'
});

const db = getFirestore();

/* export const submitContribution = async (nftName, contribution, walletID) => {
  const contributionsRef = (db, nftName, "contributors")

  await setDoc(contributionsRef, {
  walletID : contribution
  }).catch()
} */

export default db;