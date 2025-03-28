
import  {generateWitness}  from "../witnessGenerator/generate_witness.js";

import { groth16 } from "snarkjs";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs/promises';
import { poseidonHash } from "./poseidonHash.js";
import { convertStrToBigInt } from "../utils.js";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let verificationKey, zkeyFile

// IIFE to set constants that'll be reuse through externals calls
// read and assign the zkey and the verification_key files
(async () => {
    try {
      const  zkeyPath = path.join(__dirname, "../witnessGenerator/circuit_0001.zkey")
      const  verificatiozkeyPath = path.join(__dirname, "../witnessGenerator/verification_key.json")
      zkeyFile= await fs.readFile(zkeyPath)
      const verificationkeyFile =  await fs.readFile(verificatiozkeyPath, 'utf8')
      verificationKey = JSON.parse(verificationkeyFile)
        } catch (error) {
          console.error("Error loading files at startup:", error);
          process.exit(1);
        }
  })();

export const createzkproof = async (inputData) => {
  try {
    // Get hashes of RFC and combination of  EmployeeWage, RFPEmployee and salt. 
    // First convert RFC to numeric Ascii codes and get its hash
    const employeeRFCBigInt = convertStrToBigInt(inputData.rfc)
    console.log('employeeRFCBigInt',employeeRFCBigInt)
    const resultRFC = await poseidonHash([employeeRFCBigInt])
    if (!resultRFC.status) throw new Error(error.message)
    const RFPEmployee = resultRFC.hash
    console.log('hash de employee',RFPEmployee)
    console.log('typeof hash de employee',typeof RFPEmployee)
    const resultpublishRFC = await poseidonHash([
      BigInt(inputData.wageAmount), RFPEmployee, BigInt(inputData.salt)]
    )
    if (!resultpublishRFC.status) throw new Error(error.message)
    const publishRFC = resultpublishRFC.hash
    console.log('publishRFC',publishRFC)
    console.log('typeof publishRFC',typeof publishRFC)
    
    // set inputObject (the circuit inputData.json)
    const inputObject = {
      EmployeeWage: inputData.wageAmount,
      RFPEmployee,
      salt: inputData.salt,
      RFP: RFPEmployee,
      suppliedHash: publishRFC
    }
    console.log('inputObject',inputObject)
    // generate witness file from inputData sent1
    const witnessResult = await generateWitness(inputObject);
    if (!witnessResult.status) throw new Error(witnessResult.msg)
      // generate a zk-SNARK proof through Groth16 schema. Use proof keys on circuit_0001.zky and the witness generated in previous step and produce 
      // proof.json (pA, pB y pC) and public.json (the publi signals)
      const { proof, publicSignals } = await groth16.prove(
        zkeyFile,      
        witnessResult.witnessFile  
      );
      console.log('proof',proof)
      console.log('publicSignals',publicSignals)
      
      // check the generated proof is valid
      const isValid = await groth16.verify(verificationKey, publicSignals, proof);
      if (!isValid) throw new Error("Invalid proof")
      // all right, last step: generate a suitable params array from proof &  publicSignals formated for smart contract verifier  [a, b, c, input] 
      // [i.e. _pA, _pB, _pC, publicSignals]) using equivalent to CLI snarkjs generatecall
      const callData = await groth16.exportSolidityCallData(proof, publicSignals);
      console.log('Call Data:', callData);
      // Opcional: Parsear a un objeto más legible
      const [a, b, c, input] = JSON.parse(`[${callData}]`);
      console.log('a:', a);
      console.log('b:', b);
      console.log('c:', c);
      console.log('input:', input);

      return({
        status: true,
        paramsSC: callData,
        a, b, c, input
      })  

    } catch (error) {
      console.error("**Error generando witness:", error.message);
      return ({ status: false, msg: error.message });
    }
};


