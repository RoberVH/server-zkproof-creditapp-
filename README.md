# ZKPPROOF-CREDITAPP SERVER 

server for zkproof-creditApp application

**Date**: March, 2025  
**Author**: Roberto VH [rovicher.eth](https://x.com/RoberVH)  
**Description**: Server for Demo app for a ZKProof based validation of an employee having a wage greater that a Creditor requested minimum limit without disclosing real salary  
**Notes**: This demo server was created with NODE 20.13.1 &  Express


### Basic installation of  Frameworks for  app from scratch

```
npm install cors
pnpm add snarkjs
pnpm add circomlibjs
pnpm install ethers
```

Notice tailwindcss is not last version as of march 2025, it won't work 

## CIRCOM
Circuit circom to create valid wage ZKProofs
Verifier Contract VerifyValidWage.sol deployed to 
    ``0xAd0fB84F188DF7Bb7A889FFC734739f34bBA2a14
    ``
    on Sepolia (as of March 2025))

Call function function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[3] calldata _pubSignals) public view returns (bool)  with proof to verify


### Execute dev environment
 ```
 pnpm run dev
 ```

Rest of components will be downloaded and installed from the package.json 