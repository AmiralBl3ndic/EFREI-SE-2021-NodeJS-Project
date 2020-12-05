const nextApp = require('next')({ dev: process.env.NODE_ENV !== 'production' });
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const app = require('./server');
const { port } = require('./config');

////////////////////////////////////////////////////////////
// Server bootstrap
////////////////////////////////////////////////////////////
nextApp
	.prepare()
	.then(() => {
		// Handle HTTP GET requests to be passed to NextJS
		app.get('*', nextApp.getRequestHandler());

		// Handle all HTTP requests which have not received a response and send a HTTP 404 response
		app.use((req, res, next) => {
			res.status(StatusCodes.NOT_FOUND).json({
				code: StatusCodes.NOT_FOUND,
				status: getReasonPhrase(StatusCodes.NOT_FOUND),
			});
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
