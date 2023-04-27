// code taken / inspired from https://www.youtube.com/watch?v=7nafaH9SddU
const express = require("express");
const bodyParser = require("body-parser");
const { genSalt, hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const pg = require("pg");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Create a new PostgreSQL connection pool
const pool = new pg.Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "AAAaaa111",
  port: 5432, // or your database's port
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                Utilisateur                                              //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Register a new user
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUserQuery = "SELECT * FROM utilisateurs WHERE email = $1";
    const { rowCount } = await pool.query(existingUserQuery, [email]);

    if (rowCount > 0) {
      res.status(409).send("User with this email already exists.");
    } else {
      // Hash the user's password
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      // Insert the new user into the database
      const insertUserQuery =
        "INSERT INTO utilisateurs (email, username, password) VALUES ($1, $2, $3)";
      await pool.query(insertUserQuery, [email, username, hashedPassword]);
      console.log("User registered:", { email, username, hashedPassword });

      // créé les utilisateur avec un module et page de base
      const initPageQuery = "INSERT INTO page (titre,sous_titre,contenu,utilisateur) VALUES ($1,$2,$3,$4)";
      await pool.query(initPageQuery, [null, null, null, email]);

      const initModuleQuery = "INSERT INTO module (contenu,grandeurPolice,police) VALUES ($1,$2,$3)";
      await pool.query(initModuleQuery, [null, null, null]);

      res.status(201).send("Registration successful");
    }
  } catch (err) {
    console.log("Error during registration:", err.message);
    console.error(err);

    res.status(500).send("An error occurred while registering the user.");
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const getUserQuery = "SELECT * FROM utilisateurs WHERE email = $1";
    const { rows } = await pool.query(getUserQuery, [email]);

    if (rows.length === 0) {
      res.status(401).send("Invalid email or password");
      return;
    }

    // Check if the password is correct
    const { username, password: hashedPassword } = rows[0];
    const isMatch = await compare(password, hashedPassword);

    if (!isMatch) {
      res.status(401).send("Invalid email or password");
      return;
    }

    // Create a JWT token
    const token = sign({ email }, "your_secret_key_here");
    res.status(200).json({ username, token });
  } catch (err) {
    console.log("Error during login:", err.message);
    console.error(err);
    res.status(500).send("An error occurred while logging in.");
  }
});

// // Modifier info utilisateur courrant:
// app.post("/api/update_user", authenticateUser, async (req, res) => {
//   try {
//     const userid = req.session.user.id;
//     const { email, username, password } = req.body;

//     const checkUserQuery = "SELECT * FROM utilisateurs WHERE email = $1";
//     const { rows } = await pool.query(checkUserQuery, [userid]);
//     const user = rows.find((user) => user.id === userid);
//     if (!user) {
//       res.status(401).json({ msg: "User does not exist" });
//       return;
//     }
//     if (user.id != req.session.user.id) {
//       res.status(401).json({ msg: "Action non-autorisee" });
//       return;
//     }
//     const salt = await bcrypt.genSalt(10); //ref : https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
//     const hash = await bcrypt.hash(password, salt);
//     const updateUserQuery =
//       "UPDATE utilisateurs SET email = $1, username = $2, password = $3 WHERE id = $4";
//     await pool.query(updateUserQuery, [email, username, hash, userid]);
//     console.log("User updated:", { email, username });
//     res.status(200).json(user);
//   } catch (err) {
//     console.log("Error during updating user:", err.message);
//     console.error(err);
//     res
//       .status(500)
//       .send("An error occurred while trying to update user from the database.");
//   }
// });

// //delete user
// app.post("/api/del_user", authenticateUser, async (req, res) => {
//   try {
//     const { email } = req.body;
//     const delUserQuery = "DELETE FROM utilisateurs WHERE email = $1";
//     if (req.session.user && req.session.user.email === email) {
//       await pool.query(delUserQuery, [email]);
//       console.log("User deleted:", { email });
//       req.session.destroy();
//       res.redirect("/login");
//       res.status(200).json(user);
//     }
//   } catch (err) {
//     console.log("Error during deletion:", err.message);
//     console.error(err);
//     res
//       .status(500)
//       .send("An error occurred while trying to delete user from the database.");
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                Notes                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// save notes in database
app.post("/api/savenotes", async (req, res) => {
  try {
    const { owner, titre, note } = req.body;
    const insertNoteQuery =
      "INSERT INTO notes (owner, titre, note, date) VALUES ($1, $2, $3,NOW()) RETURNING id";
    result = await pool.query(insertNoteQuery, [owner, titre, note]);
    res.status(200).send(`Note ${titre} created`);
    console.log(`Note ${titre} creer:`, { titre, note });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while accessing the database.");
  }
});
//update notes in database
app.post("/api/updatenotes", async (req, res) => {
  try {
    const { id, titre, note } = req.body;
    const updateNoteQuery =
      "UPDATE notes SET titre = $1, note = $2 WHERE id = $3";
    await pool.query(updateNoteQuery, [titre, note, id]);
    res.status(200).send(`Note ${titre} updated`);
    console.log(`Note ${titre} updated:`, { titre, note });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while accessing the database.");
  }
});
//delete notes in database
app.post("/api/deletenotes", async (req, res) => {
  try {
    const { id } = req.body;
    const deleteNoteQuery = "DELETE FROM notes WHERE id = $1";
    await pool.query(deleteNoteQuery, [id]);
    res.status(200).send(`Note ${id} deleted`);
    console.log(`Note ${id} deleted:`, { id });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while accessing the database.");
  }
});

//pour share une note avec un autre utilisateur
app.post("/api/sharenotes", async (req, res) => {
  try {
    const { id, contact } = req.body;
    const getnoteQuery = "SELECT * FROM notes WHERE id = $1";
    const { rows } = await pool.query(getnoteQuery, [id]);
    const note = rows.find((note) => note.id === id);
    if (!note) {
      res.status(401).json({ msg: "Note does not exist" });
      return;
    }
    const getuserQuery = "SELECT * FROM utilisateurs WHERE email = $1";
    //TODO : faire une fonction qui share avec plusieurs utilisateurs
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while accessing the database.");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
