// ref: https://www.tabnine.com/code/javascript/functions/crypto/randomBytes
const crypto = require('crypto');
const session = require('express-session');

const generateKey = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};
// code taken / inspired from https://www.youtube.com/watch?v=7nafaH9SddU
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
const { sign } = require('jsonwebtoken');
const pg = require('pg');
const cors = require('cors');

// const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = require('./ConnectionDB.cjs');

const app = express();
// pool connection pour la base de donn
const pool = new pg.Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

//ref: chat gpt - https://www.youtube.com/watch?v=7nafaH9SddU
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contenu-Type, Accept');
  next();
});

const userKey = generateKey(32);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: { userKey },
  resave: false,
  saveUninitialized: true,
}));
// Middleware pour vérifier si l'utilisateur est authentifié 
// function authenticateUser - ref: chatgpt
function authenticateUser(req, res, next) {
  if (!req.session.userId) {
    res.status(401).send('Non autorisé à accéder à cette ressource');
    return;
  }
  next();
}
// enregistre un nouvel utilisateur et l'ajoute à la base de données
app.post('/api/register', async (req, res) => {
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
//delete user
app.post('/api/del_user', authenticateUser, async (req, res) => {
  try {
    const { email } = req.body;
    const delUserQuery = 'DELETE FROM utilisateurs WHERE email = $1';
    if(req.session.user && req.session.user.email === email){

      await pool.query(delUserQuery, [email]);
      console.log('User deleted:', { email });
      req.session.destroy();
      res.redirect('/login');
      res.status(200).json(user);
    }
  } catch (err) {
    console.log('Error during deletion:', err.message);
    console.error(err);
    res.status(500).send('An error occurred while trying to delete user from the database.');
  }
});

// Modifier info utilisateur courrant:
app.post('/api/update_user', authenticateUser, async (req, res) => {
  try {
    const userid = req.session.user.id;
    const { email, username, password } = req.body;

    const checkUserQuery = 'SELECT * FROM utilisateurs WHERE email = $1';
    const { rows } = await pool.query(checkUserQuery, [userid]);
    const user = rows.find((user) => user.id === userid);
    if (!user) {
      res.status(401).json({ msg: 'User does not exist' })
      return;
    }
    if (user.id != req.session.user.id) {
      res.status(401).json({ msg: 'Action non-autorisee' })
      return;
    }
    const salt = await bcrypt.genSalt(10); //ref : https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
    const hash = await bcrypt.hash(password, salt);
    const updateUserQuery = 'UPDATE utilisateurs SET email = $1, username = $2, password = $3 WHERE id = $4';
    await pool.query(updateUserQuery, [email, username, hash, userid]);
    console.log('User updated:', { email, username});
    res.status(200).json(user);
  } catch (err) {
    console.log('Error during updating user:', err.message);
    console.error(err);
    res.status(500).send('An error occurred while trying to update user from the database.');
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
    // """TOKEN GENERATION""" TODO
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


