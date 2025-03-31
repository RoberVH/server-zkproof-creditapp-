import { createzkproof } from './zkProofOrchestrator.js';




// create a ZK Proof for a valid wage over 20,000 MXN
const createzkproofController = async (req, res) => {
  const inputData = req.body.inputData; // get params
  
  try {
  const resultCreateZKP = await createzkproof(inputData);
  if (!resultCreateZKP.status) throw new Error(resultCreateZKP.msg);

  res.status(200).json({proof: resultCreateZKP.paramsSC});
  } catch (error ) {
    console.log('error en controller, msj', error.message)
    res.status(500).json({ msg: error.message });
  }

}


export { createzkproofController };