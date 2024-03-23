// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import mongoose, {ConnectOptions} from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import submitForm from './routes/form';
import { fileURLToPath } from 'url';
import startBirthdayEmailCronJob from './cronJobs/sendBirthdayEmails';

dotenv.config();

const dbUri = process.env.DB_URI;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
mongoose.connect(`${dbUri}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', submitForm);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db;
  startBirthdayEmailCronJob()
});
