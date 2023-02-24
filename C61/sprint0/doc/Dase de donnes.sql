CREATE TABLE "utilisateur" (
  "id" SERIAL PRIMARY KEY,
  "nom" varchar,
  "prenom" varchar,
  "courriel" varchar,
  "password" varchar,
  "theme" varchar,
  "photo" bytea
);

CREATE TABLE "utilisateur2" (
  "id" SERIAL PRIMARY KEY,
  "nom" varchar,
  "prenom" varchar,
  "courriel" varchar,
  "password" varchar,
  "theme" varchar,
  "photo" bytea
);

CREATE TABLE "contacts" (
  "id" SERIAL,
  "id_utilisateur1" int,
  "id_utilisateur2" int
);

CREATE TABLE "moduleTableau" (
  "id" SERIAL,
  "titre" varchar,
  "nom" varchar,
  "nombre" int,
  "pourcentage" decimal(2,2),
  "une_date" timestamp
);

CREATE TABLE "theme" (
  "id" SERIAL,
  "nom" varchar,
  "hex" varchar(6)
);

CREATE TABLE "moduleTexte" (
  "id" SERIAL,
  "contenu" moduleTexte
);

CREATE TABLE "moduleListe" (
  "id" SERIAL,
  "type" varchar,
  "etat" varchar
);

CREATE TABLE "moduleImage" (
  "id" SERIAL,
  "donneImage" bytea
);

CREATE TABLE "moduleSousPage" (
  "id" SERIAL,
  "nom" varchar,
  "lien" varchar
);

CREATE TABLE "page" (
  "id" SERIAL,
  "titre" varchar,
  "icone" varchar
);

CREATE TABLE "page_module" (
  "id" SERIAL,
  "id_page" int,
  "id_module" int
);

ALTER TABLE "utilisateur" ADD FOREIGN KEY ("id") REFERENCES "contacts" ("id_utilisateur1");

ALTER TABLE "utilisateur2" ADD FOREIGN KEY ("id") REFERENCES "contacts" ("id_utilisateur2");

ALTER TABLE "theme" ADD FOREIGN KEY ("id") REFERENCES "utilisateur" ("theme");

ALTER TABLE "page" ADD FOREIGN KEY ("id") REFERENCES "page_module" ("id_page");

ALTER TABLE "moduleTexte" ADD FOREIGN KEY ("id") REFERENCES "page_module" ("id_module");

ALTER TABLE "moduleListe" ADD FOREIGN KEY ("id") REFERENCES "page_module" ("id_module");

ALTER TABLE "moduleTableau" ADD FOREIGN KEY ("id") REFERENCES "page_module" ("id_module");

ALTER TABLE "moduleImage" ADD FOREIGN KEY ("id") REFERENCES "page_module" ("id_module");

ALTER TABLE "moduleSousPage" ADD FOREIGN KEY ("id") REFERENCES "page_module" ("id_module");
