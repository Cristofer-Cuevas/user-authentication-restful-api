-- Table for authentication with username and password.
CREATE TABLE users (
	id uuid NOT NULL,
	name text,
	last_name text,
	salt text,
	hash text
);


-- Table for authentication with email and password.
CREATE TABLE users_email (
	id uuid NOT NULL,
	name text,
	last_name text,
	email text,
	salt text, 
	hash text
);