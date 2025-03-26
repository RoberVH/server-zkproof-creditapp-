import express from 'express';
import { createzkproofController } from '../controllers/createzkproofController.js';
import  { testController } from '../controllers/testController.js';


const router = express.Router();

// testing and awakening route
router.get('/ping', (req, res) => {
    res.send('pong\n');
  });

// Route to create the  ZKP Proof
router.post('/createzkproof', createzkproofController)  // create ZKProof
router.get('/test', testController)  // create ZKProof


export default router