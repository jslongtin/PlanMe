const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
// FIXME
const app = express();
const port = 3000;

// Set up the PostgreSQL client
const client = new Client({
  user: 'PostgreSQL 15',
  host: 'localhost',
  database: 'postges',
  password: 'AAAaaa111',
  port: 5432
});
client.connect();

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Endpoint to handle login data
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Add the login data to the PostgreSQL database
  client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error adding user to database');
    } else {
      console.log('User added to database');
      res.json({ message: 'User added to database' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
