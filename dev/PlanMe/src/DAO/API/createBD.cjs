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
  //upsert : https://www.tutorialsteacher.com/postgresql/upsert
  const salt = await genSalt(10);
  const hashedPassword = await hash("jess", salt);
  await pool.query(
    `
    INSERT INTO utilisateurs (email, username, password, photo, theme_id) 
  VALUES ('Jess@hotmail.com', 'Jess', $1, NULL, NULL) `,
    [hashedPasswordDefault]
  );

  await pool.query(`
    CREATE TABLE IF NOT EXISTS page (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(255),
        sous_titre VARCHAR(255),
        contenu TEXT,
        utilisateur VARCHAR(255) NOT NULL,
        FOREIGN KEY (utilisateur) REFERENCES utilisateurs (email)
    )`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact (
      id SERIAL PRIMARY KEY,
      utilisateur_email VARCHAR(255) NOT NULL,
      page_id INTEGER NOT NULL,
      titre VARCHAR(255),
      souspage VARCHAR(255),
      icon VARCHAR(255),
      hauteur FLOAT DEFAULT 100,
      largeur FLOAT DEFAULT 200,
      pageparent INTEGER,
      FOREIGN KEY (utilisateur_email) REFERENCES utilisateurs (email),
      FOREIGN KEY (pageparent) REFERENCES contact (id)
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS module (
      id SERIAL PRIMARY KEY,
      contenu VARCHAR(255) NOT NULL,
      grandeurPolice INTEGER,
      police VARCHAR(255)
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
    CREATE TABLE IF NOT EXISTS calendriers (
      id SERIAL PRIMARY KEY,
      titre VARCHAR(255),
      date DATE,
      notes JSONB,
      evenements JSONB
    )
    `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      owner VARCHAR(255),
      titre VARCHAR(255),
      note TEXT,
      date DATE,
      FOREIGN KEY (owner) REFERENCES utilisateurs (email)
    )
    `);
  await pool.query(`
  CREATE TABLE IF NOT EXISTS budget (
    id SERIAL PRIMARY KEY,
    budget FLOAT,
    echeance DATE,
    depenses FLOAT
    )
    `);
})();
