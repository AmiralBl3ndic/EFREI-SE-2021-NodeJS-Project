const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const nextApp = require('next')({ dev: process.env.NODE_ENV !== 'production' });
const passport = require('./auth/passport.config');
const app = require('./server');
const { Sentry } = require('./server');
const { port } = require('./config');

////////////////////////////////////////////////////////////
// Server bootstrap
////////////////////////////////////////////////////////////
nextApp
	.prepare()
	.then(() => {
		app.get(
			'/dashboard',
			passport.authenticate('jwt', {
				session: false,
				failureRedirect: '/login',
			}),
			nextApp.getRequestHandler(),
		);

		// Handle HTTP GET requests to be passed to NextJS
		app.get('*', nextApp.getRequestHandler());

		app.use(Sentry.Handlers.errorHandler());

		// Handle all HTTP requests which have not received a response and send a HTTP 404 response
		app.use((req, res, next) => {
			res.status(StatusCodes.NOT_FOUND).json({
				code: StatusCodes.NOT_FOUND,
				status: getReasonPhrase(StatusCodes.NOT_FOUND),
			});
		});

		app.use((err, req, res, next) => {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		});

		// Actually start listening for HTTP requests on configured port
		app.listen(port, (error) => {
			if (error) throw error;

			console.log(`Server started and listening on port ${port}`);
		});
	})
	.catch((error) => {
		console.error('Something went wrong:', error);
		process.exit(1);
	});

module.exports = app;
