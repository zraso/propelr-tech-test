import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import propertyRoutes from './routes/propertyRoutes';
const cors = require('cors');
import bodyParser from 'body-parser';
// import app from './app';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

let corsOptions = { 
  origin : '*', 
} 
 
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("My Server");
});

app.use('/api', propertyRoutes);

app.get('/api/data', (req, res) => {
  // Handle your API logic here
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default server;