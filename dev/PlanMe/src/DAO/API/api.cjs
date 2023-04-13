// code taken / inspired from https://www.youtube.com/watch?v=7nafaH9SddU
const express = require('express');
const bodyParser = require('body-parser');
const { genSalt, hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pg = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Set up a connection to the PostgreSQL database using pg.Pool
const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  password: 'AAAaaa111',
  port: 5432, // or your database's port
});

// Define a route handler for registering a new user
app.post('/api/register', async (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUserQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
    const { rowCount } = await pool.query(existingUserQuery, [email]);

    if (rowCount > 0) {
      res.status(409).send('User with this email already exists.');
    } else {
      // Hash the password before storing it in the database
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO utilisateurs (email, username, password) VALUES ($1, $2, $3)';
      await pool.query(insertUserQuery, [email, username, hashedPassword]);
      console.log('User registered:', { email, username, password });

      res.status(201).send('Registration successful');
    }
  } catch (err) {
    console.log('Error during registration:', err.message);
    console.error(err);

    res.status(500).send('An error occurred while registering the user.');
  }
});

// retourne tous les utilisateurs
app.post('/api/users', async (req, res) => {
  try {
    const getUsersQuery = 'SELECT email, username FROM utilisateurs';
    const { rows } = await pool.query(getUsersQuery);
    console.log('All users:', rows);

    res.status(200).json({ users: rows });
  } catch (err) {
    console.log('Error during getting all users:', err.message);
    console.error(err);
    res.status(500).send('An error occurred while getting all users from the database.');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const getUserQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
    const { rows } = await pool.query(getUserQuery, [email]);

    if (rows.length === 0) {
      res.status(401).send('Invalid email or password');
      return;
    }

    // Compare the user's password to the hashed password in the database
    const { password: hashedPassword } = rows[0];
    const isMatch = await compare(password, hashedPassword);

    if (!isMatch) {
      res.status(401).send('Invalid email or password');
      return;
    }

    // Generate a JWT token and send it to the client
    const token = sign({ email }, 'your_secret_key_here');
    res.status(200).json({ token });
  } catch (err) {
    console.log('Error during login:', err.message);
    console.error(err);
    res.status(500).send('An error occurred while logging in.');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


