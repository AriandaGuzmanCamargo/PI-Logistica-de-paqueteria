import dotenv from 'dotenv';
import { createApp } from '../../src/app/createApp.js';

dotenv.config();

const app = createApp();
const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Backend movil (wrapper API) escuchando en http://localhost:${port}`);
});
