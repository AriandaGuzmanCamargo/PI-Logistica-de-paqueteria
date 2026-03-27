import dotenv from 'dotenv';
import { createApp } from './app/createApp.js';

dotenv.config();

const app = createApp();
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
