const express = require('express');
const bodyParser = require('body-parser');
const { genSalt, hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pg = require('pg');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

// Set up a connection to the PostgreSQL database using pg.Pool
const pool = new pg.Pool({
  user: 'postgres',
  host: 'db',
  database: 'synthese',
  password: 'AAAaaa111',
  port: 5432, // or your database's port
});

// Define a route handler for registering a new user
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUserQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
    const { rowCount } = await pool.query(existingUserQuery, [email]);

    if (rowCount > 0) {
      res.status(409).send('User with this email already exists.');
    } else {
      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO utilisateurs (email, username, password) VALUES ($1, $2, $3)';
      await pool.query(insertUserQuery, [email, username, password]);
      console.log('User registered:', { email, username, password });

      res.status(201).send('Registration successful');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while registering the user.');
  }
});

// Login a user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userQuery = 'SELECT * FROM utilisateurs WHERE username = $1';
    const { rows, rowCount } = await pool.query(userQuery, [username]);
    if (rowCount === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const user = rows[0];
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ username }, 'secretKey');
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
