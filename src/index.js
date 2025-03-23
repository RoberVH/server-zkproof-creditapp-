const express = require('express');
const cors = require('cors'); 
const routes = require('./routes/routes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // allow request from this origen
    methods: ['GET', 'POST'], // allow methods HTTP 
    //credentials: true // Allow sending of cookies & auth headers 
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }));

  
app.use(express.json());

// testing and awakening route
app.get('/ping', (req, res) => {
  res.send('pong\n');
});

app.use('/api', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});