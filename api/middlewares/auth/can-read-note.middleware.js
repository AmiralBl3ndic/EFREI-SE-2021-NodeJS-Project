const { StatusCodes } = require('http-status-codes');
const supabase = require('../../db');

/**
 * Checks whether the currently authenticated user can read a specific note
 */
const canReadNote = async (req, res, next) => {
	// Check if user is authenticated, reject if not
	if (!req.user)
		return res.status(StatusCodes.UNAUTHORIZED).json({
			resource: req.params.noteId,
		});

	// Retrieve note and access rights for user from database
	const { data, error } = await supabase
		.from('user_notes_with_rights')
		.select('can_read')
		.eq('username', req.user.username)
		.eq('note_id', req.params.noteId)
		.limit(1);

	if (error) throw new Error('Unable to determine access rights');

	// If no results or if no reading rights
	if (data.length === 0 || !data[0].can_read)
		return res.status(StatusCodes.FORBIDDEN).json({
			resource: req.params.noteId,
		});

	next();
};

module.exports = canReadNote;
