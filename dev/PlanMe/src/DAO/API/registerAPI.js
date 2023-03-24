// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

// Create a new Express app
const app = express();

// Set up body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set up a connection to the PostgreSQL database using pg.Pool
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'AAAaaa111',
  port: 5432, // or your database's port
});

// Define a route handler for registering a new user
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Insert a new row into the users table using the pool
  pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
    [username, email, password],
    (err, result) => {
      if (err) {
        console.error('Error inserting new user:', err);
        res.status(500).send('Error registering new user');
      } else {
        console.log('New user registered:', username);
        res.send('User registered successfully');
      }
    }
  );
});

// Start the Express app
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
