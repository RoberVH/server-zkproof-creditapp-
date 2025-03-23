const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller'); // Importa los controladores

//Sample GET to read a file
router.get('/read-file', controller.readFile);

// Route to create the  ZKP Proof
router.get('createzkproof', controller.createzkproof)




//Sample POST para to write a file
router.post('/write-file', controller.writeFile);

module.exports = router;