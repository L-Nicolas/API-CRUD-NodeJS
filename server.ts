import express from 'express';
import dotenv from 'dotenv';
import RateLimit from 'express-rate-limit';

//import { connexion } from './mysql/db.model';
import { routeUser } from './users/user.routes';
import { routeRapport } from './rapports/rapport.routes';

dotenv.config()

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '3000');

const app = express();

const apiLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use("/", apiLimiter);
app.use("/", routeUser);
app.use("/", routeRapport);
/*
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});*/

app.listen(PORT, async () => {
  //await connexion();
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
