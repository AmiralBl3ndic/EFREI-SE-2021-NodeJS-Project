const { StatusCodes } = require('http-status-codes');
const supabase = require('../../db');

const isAuthor = async (req, res, next) => {
	if (!req.user)
		return res.status(StatusCodes.OK).json({
			resource: req.params.noteId,
		});

	const { data, error } = await supabase
		.from('notes')
		.select('author')
		.eq('note_id', req.params.noteId)
		.eq('author', req.user.id);

	if (error) return new res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();

	if (!data || !data.length)
		return res.status(StatusCodes.FORBIDDEN).json({
			resource: req.params.noteId,
		});

	next();
};

module.exports = isAuthor;
