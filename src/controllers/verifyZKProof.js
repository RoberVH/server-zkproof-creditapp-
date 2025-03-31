
import { ethers } from 'ethers';
import dotenv from 'dotenv';

import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from 'fs';
import { join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GROTH16_VERIFIER_ABI = JSON.parse(
  readFileSync(join(__dirname, '../ethereum/Groth16VerifierABI.json'), 'utf8')
);

dotenv.config();
const RCP = process.env.URL_RPC
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
//const VERIFIER_CONTRACT_ABI = GROTH16_VERIFIER_ABI

// create a ZK Proof for a valid wage over 28,000 MXN
const verifyZKProof = async (req, res) => {
  
  
  const {_pA,_pB,_pC, _pubSignals } = req.body;
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