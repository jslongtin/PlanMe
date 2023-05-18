const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const { genSalt, hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const pg = require("pg");
const cors = require("cors");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "AAAaaa111",
  port: 5432,
});

(async () => {
  let sel = await genSalt(10);
  let hashedPasswordDefault = await hash("jess", sel);
  // Drop tables if they exist
  // await pool.query("DROP TABLE IF EXISTS liens");
  // await pool.query("DROP TABLE IF EXISTS tableaux");
  // await pool.query("DROP TABLE IF EXISTS liste");
  // await pool.query("DROP TABLE IF EXISTS module");
  // await pool.query("DROP TABLE IF EXISTS page");
  // await pool.query("DROP TABLE IF EXISTS contact");
  // await pool.query("DROP TABLE IF EXISTS utilisateurs");
  // await pool.query("DROP TABLE IF EXISTS themes");
  // await pool.query("DROP TABLE IF EXISTS calendriers");
  // await pool.query("DROP TABLE IF EXISTS budget");
  // await pool.query("DROP TABLE IF EXISTS notes");
  // await pool.query("DROP TABLE IF EXISTS events");
  // await pool.query("DROP TABLE IF EXISTS page_module");
  // await pool.query("DROP TABLE IF EXISTS texte");

  //reset schema ref: https://stackoverflow.com/questions/3327312/how-to-drop-all-tables-in-postgresql

  // await pool.query(`
  // DROP SCHEMA public CASCADE;
  // CREATE SCHEMA public;
  // )
  // `);

  // Create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS themes (
      id SERIAL PRIMARY KEY,
      color1 VARCHAR(255),
      color2 VARCHAR(255),
      color3 VARCHAR(255)
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS utilisateurs (
        email VARCHAR(255) NOT NULL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        photo BYTEA,
        theme_id INTEGER,
        FOREIGN KEY (theme_id) REFERENCES themes (id)
    )`);

  // créer utilisateurs par defauts a la création de  la bd
  // ref: https://chat.openai.com/
  //ref upsert : https://www.tutorialsteacher.com/postgresql/upsert
  // **************************************************************
  // utilisateur par defauts
  let salt = await genSalt(10);
  let hashedPassword = await hash("Jess!2345", salt);
  await pool.query(
    `
    INSERT INTO utilisateurs (email, username, password, photo, theme_id) 
  VALUES ('Jess@hotmail.com', 'Jess', $1, NULL, NULL) ON CONFLICT DO NOTHING`,
    [hashedPasswordDefault]
  );

  salt = await genSalt(10);
  hashedPassword = await hash("Ato!2345", salt);
  await pool.query(
    `
    INSERT INTO utilisateurs (email, username, password, photo, theme_id) 
  VALUES ('ato@ato.com', 'ato', $1, NULL, NULL) ON CONFLICT DO NOTHING`,
    [hashedPassword]
  );

// **************************************************************
//  utilisateurs pour contacts

let names = [
  { email: 'sugar@sugar.com', username: 'sugar' },
  { email: 'spice@spice.com', username: 'spice' },
  { email: 'sasha@colby.com', username: 'sasha' },
  { email: 'bob@thedragqueen.com', username: 'bob' },
  { email: 'monet@xchange.com', username: 'monet' },
  { email: 'jinx@monsoon.com', username: 'jinx' },
  { email: 'alaska@thunderf6000,com', username: 'alaska' },
];

for (let { email, username } of names) {
  let salt = await genSalt(10);
  let hashedPassword = await hash('Ato!2345', salt);

  await pool.query(
    `
    INSERT INTO utilisateurs (email, username, password, photo, theme_id) 
    VALUES ($1, $2, $3, NULL, NULL) ON CONFLICT DO NOTHING`,
    [email, username, hashedPassword]
  );
}

await pool.query(
  `INSERT INTO contact (utilisateur_email,contact) 
  VALUES ('ato@ato.com','Jess@hotmail.com') ON CONFLICT DO NOTHING`
);

  // **************************************************************

  await pool.query(`
    CREATE TABLE IF NOT EXISTS page (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(255),
        contenu TEXT,
        utilisateur VARCHAR(255) NOT NULL,
        FOREIGN KEY (utilisateur) REFERENCES utilisateurs (email)
    )`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact (
      id SERIAL PRIMARY KEY,
      utilisateur_email VARCHAR(255) NOT NULL UNIQUE,
      contact VARCHAR(255) NOT NULL UNIQUE,
      FOREIGN KEY (utilisateur_email) REFERENCES utilisateurs (email),
      FOREIGN KEY (contact) REFERENCES utilisateurs (email)
    )
    `);

  // ajouter des contacts par defauts a la création de la bd
  await pool.query(
    `
      INSERT INTO contact (utilisateur_email,contact) 
    VALUES ('Jess@hotmail.com', 'ato@ato.com') ON CONFLICT DO NOTHING`
  );

  await pool.query(
    `INSERT INTO contact (utilisateur_email,contact) 
    VALUES ('ato@ato.com','Jess@hotmail.com') ON CONFLICT DO NOTHING`
  );
  // **************************************************************

  // MODULES
  await pool.query(`
    CREATE TABLE IF NOT EXISTS texte (
      id SERIAL PRIMARY KEY,
      contenu VARCHAR(255)
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS page_module (
      id SERIAL PRIMARY KEY,
      id_page INTEGER,
      id_module INTEGER
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS liste (
      id SERIAL PRIMARY KEY,
      type VARCHAR(255),
      contenu TEXT[],
      etat BOOLEAN
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tableaux (
      id SERIAL PRIMARY KEY,
      nbRangees INTEGER,
      nbColonnes INTEGER
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS liens (
      id SERIAL PRIMARY KEY,
      utilisateur VARCHAR(255),
      lien VARCHAR(255),
      page_id INTEGER,
      FOREIGN KEY (utilisateur) REFERENCES utilisateurs (email),
      FOREIGN KEY (page_id) REFERENCES page (id)
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id BIGINT PRIMARY KEY,
      text Text,
      start_date TIMESTAMP NOT NULL,
      end_date TIMESTAMP NOT NULL,
      user_email VARCHAR(255) NOT NULL,
      page_id INTEGER,
      FOREIGN KEY (page_id) REFERENCES page (id),
      FOREIGN KEY (user_email) REFERENCES utilisateurs (email)
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      owner VARCHAR(255),
      titre VARCHAR(255),
      note TEXT,
      date DATE,
      page_id INTEGER,
      FOREIGN KEY (page_id) REFERENCES page (id),
      FOREIGN KEY (owner) REFERENCES utilisateurs (email)
    )
    `);
  await pool.query(`
  CREATE TABLE IF NOT EXISTS budget (
    id SERIAL PRIMARY KEY,
    budget FLOAT,
    echeance DATE,
    depenses FLOAT,
    page_id INTEGER,
    FOREIGN KEY (page_id) REFERENCES page (id)
    )
    `);
})();
