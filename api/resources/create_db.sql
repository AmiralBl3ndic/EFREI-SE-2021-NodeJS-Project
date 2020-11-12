CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS notes_access;
DROP TABLE IF EXISTS modifications;
DROP TABLE IF EXISTS revisions;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	user_id uuid DEFAULT uuid_generate_v4(),
	username VARCHAR(200) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS notes (
	note_id uuid DEFAULT uuid_generate_v4(),
	title TEXT,
	author uuid NOT NULL,
	PRIMARY KEY (note_id),
	CONSTRAINT fk_notes_user FOREIGN KEY (author) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS revisions (
	revision_id uuid DEFAULT uuid_generate_v4(),
	createdAt TIMESTAMP DEFAULT now(),
	note uuid NOT NULL,
	PRIMARY KEY (revision_id),
	CONSTRAINT fk_revisions_note FOREIGN KEY (note) REFERENCES notes(note_id)
);

CREATE TABLE IF NOT EXISTS modifications (
	modification_id uuid DEFAULT uuid_generate_v4(),
	previous TEXT,
	modified TEXT,
	revision uuid NOT NULL,
	PRIMARY KEY (modification_id),
	CONSTRAINT fk_modifications_revisions FOREIGN KEY (revision) REFERENCES revisions(revision_id)
);

-- Many to many relationship
CREATE TABLE IF NOT EXISTS notes_access (
	user_id uuid NOT NULL,
	note uuid NOT NULL,
	PRIMARY KEY (user_id, note),
	CONSTRAINT fk_notes_access_users FOREIGN KEY (user_id) REFERENCES users(user_id),
	CONSTRAINT fk_notes_access_notes FOREIGN KEY (note) REFERENCES notes(note_id)
);
