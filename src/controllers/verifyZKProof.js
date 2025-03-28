
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import GROTH16_VERIFIER_ABI from "../ethereum/Groth16VerifierABI.json" assert { type: "json" }


dotenv.config();
const RCP = process.env.URL_RPC
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
//const VERIFIER_CONTRACT_ABI = GROTH16_VERIFIER_ABI

// create a ZK Proof for a valid wage over 20,000 MXN
const verifyZKProof = async (req, res) => {
  
  const {_pA,_pB,_pC, _pubSignals } = req.body;
  console.log('pA',_pA)
    console.log('pB',_pB)
    console.log('pC',_pC)
    console.log('pubSignals', _pubSignals)
  try {
    const provider = new ethers.JsonRpcProvider(RCP);
    if (!provider) {
      throw new Error('Could not establish a connection to RPF provider');
    }

    const verifierContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      GROTH16_VERIFIER_ABI,
      provider
    );

     const isValid = await verifierContract.verifyProof(_pA, _pB, _pC, _pubSignals);

    // Responder con el resultado de la verificación
    res.status(200).json({isValid  });
   
  } catch (error ) {
    console.log('error en verifyZKProof', error.message)
    res.status(500).json({ msg: error.message });
  }

}


export { verifyZKProof };