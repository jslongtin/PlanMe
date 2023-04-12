const pg = require("pg");

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
} = require("./ConnectionDB.cjs");

const pool = new pg.Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "AAAaaa111",
  port: 5432,
});

(async () => {
  try {
    const getUsersQuery = "SELECT * FROM utilisateurs";
    const { rows } = await pool.query(getUsersQuery);
    console.log("All users:", rows);
  } catch (err) {
    console.log("Error during getting all users:", err.message);
    console.error(err);
  } finally {
    pool.end();
  }
})();
