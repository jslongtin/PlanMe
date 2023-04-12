const express = require("express");
const bodyParser = require("body-parser");
const { genSalt, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const pg = require("pg");
const cors = require("cors");

const app = express();

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
} = require("./ConnectionDB.cjs");

const pool = new pg.Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

app.use(bodyParser.json());
app.use(cors());

// Define a route handler for registering a new user
app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUserQuery = "SELECT * FROM utilisateurs WHERE email = $1";
    const { rowCount } = await pool.query(existingUserQuery, [email]);

    if (rowCount > 0) {
      res.status(409).send("User with this email already exists.");
    } else {
      // Hash the password before storing it in the database
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      // Insert the new user into the database
      const insertUserQuery =
        "INSERT INTO utilisateurs (email, username, motdepasse) VALUES ($1, $2, $3)";
      await pool.query(insertUserQuery, [email, username, hashedPassword]);

      console.log("User registered:", { email, username, password });
      res.status(201).send("Registration successful");
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("An error occurred while registering the user.");
  }
});

// Define a route handler for getting all users
app.get("/api/users", async (req, res) => {
  try {
    const getUsersQuery = "SELECT * FROM utilisateurs";
    const { rows } = await pool.query(getUsersQuery);

    console.log("All users:", rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error during getting all users:", err);
    res
      .status(500)
      .send("An error occurred while getting all users from the database.");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
