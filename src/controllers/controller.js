const fs = require('fs');
const path = require('path');

// Ruta del archivo
const filePath = path.join(__dirname, '../data/example.txt');

// Controlador para leer un archivo
const readFile = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer el archivo' });
    }
    res.json({ content: data });
  });
};

// Controlador para escribir un archivo
const writeFile = (req, res) => {
  const content = req.body.content; // Contenido a escribir en el archivo

  if (!content) {
    return res.status(400).json({ error: 'El contenido es requerido' });
  }

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo escribir el archivo' });
    }
    res.json({ message: 'Archivo escrito correctamente' });
  });
};


// create a ZK Proof for a valid wage over 20,000 MXN
const createzkproof = (req, res) => {
 const content = req.body.content; // get params

 res.json({ message: 'Archivo escrito correctamente' });

}


module.exports = { readFile, writeFile, createzkproof };