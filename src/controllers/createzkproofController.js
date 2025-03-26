import e from 'express';
import fs from 'fs';
import path from "path";
import { createzkproof } from './zkProofOrchestrator.js';




// create a ZK Proof for a valid wage over 20,000 MXN
const createzkproofController = async (req, res) => {
  const inputData = req.body.inputData; // get params
  
  console.log('en controller inputData', inputData)
  try {
  const resultCreateZKP = await createzkproof(inputData);
  if (!resultCreateZKP.status) throw new Error(resultCreateZKP.msg);
  console.log('resultCreateZKP',resultCreateZKP)
  res.status(200).json({proof: resultCreateZKP.proof, publicSignals: resultCreateZKP.publicSignals });
  } catch (error ) {
    console.log('error en controller, msj', error.message)
    res.status(500).json({ msg: error.message });
  }

}


export { createzkproofController };