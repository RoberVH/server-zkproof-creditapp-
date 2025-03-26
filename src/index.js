import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // allow request from this origen
    methods: ['GET', 'POST'], // allow methods HTTP 
    //credentials: true // Allow sending of cookies & auth headers 
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }));
app.use(express.json());
app.use(routes);




// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});