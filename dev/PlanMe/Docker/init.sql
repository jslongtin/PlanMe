SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'postgres' AND pid <> pg_backend_pid();
CREATE DATABASE synthese IF NOT EXISTS;

\c synthese

CREATE TABLE utilisateurs (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(50)
);
INSERT INTO utilisateurs (email, username, password) VALUES ('John Doe', 'AAAaaa111', 'john.doe@example.com');
