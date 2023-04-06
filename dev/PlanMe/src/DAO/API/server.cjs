// code taken / inspired from https://www.youtube.com/watch?v=7nafaH9SddU
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
const { sign } = require('jsonwebtoken');
const pg = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contenu-Type, Accept');
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
    const salt = await bcrypt.genSalt(10); //ref : https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
    const hash = await bcrypt.hash(password, salt);

    const insertUserQuery = 'INSERT INTO utilisateurs (email, username, password) VALUES ($1, $2, $3)';
    await pool.query(insertUserQuery, [email, username, hash]);
    console.log('User registered:', { email, username, hash });

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
        // compare password
        hash = user.password;
        const result = await bcrypt.compare(password, hash);
        if (result) {
          res.status(200).json(user);
        }
        
    }
    
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

// TEXT NOTES SECTION
app.post('/api/savenotes', async (req, res) => {
  try {
    const { owner_id, title, contenu } = req.body;
    const insertNoteQuery = 'INSERT INTO moduletexte (owner_id, title, contenu,date_creation) VALUES ($1, $2, $3,NOW()) RETURNING id';
    result = await pool.query(insertNoteQuery, [owner_id,title, contenu]);
    res.status(200).send(`Note ${title} created`);
    console.log(`Note ${title} updated:`, { title, contenu });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while accessing the database.');
    }
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});



