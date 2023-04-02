const express = require('express');
const bodyParser = require('body-parser');
const { genSalt, hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pg = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Set up a connection to the PostgreSQL database using pg.Pool
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
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

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utilisateurs');
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// /api/courses/1

app.get('/api/courses/:id', (req, res) => {
    res.send(req.query);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


