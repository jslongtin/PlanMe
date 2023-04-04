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
// enregistre un nouvel utilisateur et l'ajoute à la base de données
app.post('/api/users', async (req, res) => {
  try {
    
    const { email, username, password } = req.body;
    // const salt = await genSalt(10);
    // password = await hash(password, salt);
    const insertUserQuery = 'INSERT INTO utilisateurs (email, username, password) VALUES ($1, $2, $3)';
    await pool.query(insertUserQuery, [email, username, password]);
    console.log('User registered:', { email, username, password });

    // const getUsersQuery = 'SELECT * FROM utilisateurs';
    // const { rows } = await pool.query(getUsersQuery);
    // res.status(200).json(rows);
    // console.log('All users:', rows);
    
  } catch (err) {
    console.log('Error during getting all users:', err.message);
    console.error(err);
    res.status(500).send('An error occurred while getting all users from the database.');
  }
});
// vérifie si l'utilisateur existe dans la base de données
app.post('/api/login', async (req, res) => {
  try {

    const { email, username, password } = req.body;

    const checkUserQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
    const { rows } = await pool.query(checkUserQuery, [email]);
    const user = rows.find((user) => user.email === email);
    if (user) {
    res.status(200).json(rows);
    }
    // const isMatch = await compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ msg: 'Invalid credentials' });
    // }
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // sign(
    //   payload,
    //   'secret',
    //   {
    //     expiresIn: 360000,
    //   },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );    
  } catch (err) {
    console.log('Error during getting all users:', err.message);
    console.error(err);
    res.status(500).send('An error occurred while getting all users from the database.');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});



