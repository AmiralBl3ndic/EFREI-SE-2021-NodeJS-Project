const express = require('express');
const { StatusCodes } = require('http-status-codes');
const AuthService = require('../../services/auth.service');
const UserService = require('../../services/user.service');
const router = express.Router();

const min8CharsRegex = /^.{8,}$/;
const lowercaseRegex = /[a-z]/;
const uppercaseRegex = /[A-Z]/;
const digitRegex = /\d/;
const specialCharRegex = /\W|_/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function getEmailValidationError(email) {
	if (email == null) return 'Missing email parameter';

	email = email.trim().toLowerCase();

	if (email === '') return 'Email must be set';

	if (!emailRegex.test(email)) return 'Invalid email format';

	return '';
}

function getUsernameValidationError(username) {
	if (username == null) return 'Missing username parameter';

	username = username.trim();

	if (username === '') return 'Username must be set';

	return '';
}

function getPasswordValidationError(password) {
	if (password == null) return 'Missing password parameter';

	if (
		![
			min8CharsRegex,
			lowercaseRegex,
			uppercaseRegex,
			digitRegex,
			specialCharRegex,
		].every((regex) => regex.test(password))
	)
		return 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit and a special character';

	return '';
}

function validateRequest(req, res, next) {
	const emailValidationError = getEmailValidationError(req.body.email);
	if (emailValidationError)
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ reason: emailValidationError });

	const usernameValidationError = getUsernameValidationError(req.body.username);
	if (usernameValidationError)
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ reason: usernameValidationError });

	const passwordValidationError = getPasswordValidationError(req.body.password);
	if (passwordValidationError)
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ reason: passwordValidationError });

	req.body.username = req.body.username.trim();
	req.body.email = req.body.email.trim().toLowerCase();

	next();
}

router.post('/', validateRequest, async (req, res) => {
	// Check the availability of the credentials
	if (
		await UserService.isEmailOrUsernameTaken(req.body.email, req.body.username)
	) {
		return res.status(StatusCodes.CONFLICT).send();
	}

	try {
		const user = await UserService.create(req.body);

		if (!user)
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Unable to create user',
			});

		return res.status(StatusCodes.CREATED).json({
			username: req.body.username,
			token: AuthService.issueJwt(req.body.username),
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'production')
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Something went wrong',
			});
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error,
			message: 'Something went wrong',
		});
	}
});

module.exports = router;
