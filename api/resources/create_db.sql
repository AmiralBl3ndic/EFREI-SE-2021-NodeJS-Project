CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS notes_access_control;
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
	author uuid NOT NULL,
	title TEXT,
	current_content TEXT,
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


CREATE TABLE IF NOT EXISTS notes_access_control (
	user_id uuid NOT NULL,
	note uuid NOT NULL,
	can_read BOOLEAN DEFAULT false,
	can_write BOOLEAN DEFAULT false,
	PRIMARY KEY (user_id, note),
	CONSTRAINT fk_notes_access_users FOREIGN KEY (user_id) REFERENCES users(user_id),
	CONSTRAINT fk_notes_access_notes FOREIGN KEY (note) REFERENCES notes(note_id)
);

-- To view all notes all users have access to with respective access rights
CREATE OR REPLACE VIEW user_notes_with_rights AS
	SELECT
		u.user_id,
		u.username,
		u.email,
		n.note_id,
		n.title,
		n.current_content,
		nac.can_read,
		nac.can_write
	FROM
		notes_access_control nac
	LEFT JOIN
		users u
	ON
		nac.user_id = u.user_id
	LEFT JOIN
		notes n
	ON
		nac.note = n.note_id;

