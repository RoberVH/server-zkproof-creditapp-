
import { buildPoseidon } from 'circomlibjs';
import { poseidonHash } from "./poseidonHash.js";





// create a ZK Proof for a valid wage over 20,000 MXN
const testController = async (req, res) => {
  const wage = 45000
  const salt = 8142
  const rfc =  BigInt('149323113730390300000')
  console.log('wage',wage)
  console.log('salt',salt)
  console.log('rfc',rfc)
  //const rfcPublish=[45000n, 149323113730390300000n, 142n]
  const rfcPublish=[wage, rfc, salt ]
    try {
      const poseidonHasher = await buildPoseidon()
      const hash = poseidonHasher(rfcPublish); // Genera el hash como 

      console.log('--->Hash (string):', poseidonHasher.F.toString(hash));
      console.log('hash de', rfcPublish ,' es ', hash)
    res.status(200).json({});
    const otroHash = await poseidonHash(rfcPublish)
    console.log('El otrohash', otroHash)
  } catch (error ) {
    console.log('error en testController, msj', error.message)
    res.status(500).json({ msg: error.message });
  }

}


export { testController };