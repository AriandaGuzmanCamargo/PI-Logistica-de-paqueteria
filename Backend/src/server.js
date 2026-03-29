import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createApp } from './app/createApp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = createApp();
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
