// Config
const { port } = require('./config');

// NextJS
const dev = process.env.NODE_ENV !== 'production';
const nextApp = require('next')({ dev });
const nextHandler = nextApp.getRequestHandler();

// Swagger
const swaggerUI = require('swagger-ui-express');
const openAPISpecs = require('yamljs').load('./api/openapi.yml');

// Express
const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const app = express();

// Passport
const configuredPassport = require('./auth/passport.config');

// Routes
const apiRoutes = require('./routes/root.routes');

////////////////////////////////////////////////////////////
// Server bootstrap
////////////////////////////////////////////////////////////
nextApp
	.prepare()
	.then(() => {
		////////////////////////////////////////////////////////////
		// Express setup
		////////////////////////////////////////////////////////////
		app.use(express.json());
		app.use(express.urlencoded({ extended: false }));
		app.use(configuredPassport.initialize());

		app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(openAPISpecs));
		app.use('/api', apiRoutes);

		app.get('*', nextHandler);

		app.use((req, res, next) => {
			res.status(StatusCodes.NOT_FOUND).json({
				code: StatusCodes.NOT_FOUND,
				status: getReasonPhrase(StatusCodes.NOT_FOUND),
			});
		});

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
