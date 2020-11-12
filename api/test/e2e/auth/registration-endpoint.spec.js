const chai = require('chai');
const chaiHttp = require('chai-http');
const { StatusCodes } = require('http-status-codes');
const api = require('../../../index');

const { expect } = chai;
chai.use(chaiHttp);

const endpoint = '/auth/register';

function generateApiCall() {
	return chai
		.request(api)
		.post(endpoint)
		.set('Content-Type', 'application/json');
}

describe(`POST ${endpoint}`, () => {
	it('should register user valid parameters', (done) => {
		const validUsername = 'randomUsername';
		const validEmail = 'valid.email@mail.com';
		const validPassword = 'Str0ngP4ssword!';

		generateApiCall()
			.send({
				username: validUsername,
				email: validEmail,
				password: validPassword,
			})
			.end((err, res) => {
				// eslint-disable-next-line no-unused-expressions
				expect(err).to.not.be.ok;
				expect(res).to.have.status(StatusCodes.CREATED);
				expect(res.body).to.have.all.keys('username', 'token');
				expect(res.body.username).to.equal(validUsername);
				expect(res.body.token).to.have.length.above(0);
				done();
			});
	});

	it('should reject request with no parameters', (done) => {
		generateApiCall()
			.send({})
			.end((err, res) => {
				// eslint-disable-next-line no-unused-expressions
				expect(err).to.not.be.ok;
				expect(res).to.have.status(StatusCodes.BAD_REQUEST);
				done();
			});
	});

	it('should specify missing username parameter', (done) => {
		generateApiCall()
			.send({ email: 'email@mail.com', password: '__A_PASSWORD' })
			.end((err, res) => {
				// eslint-disable-next-line no-unused-expressions
				expect(err).to.not.be.ok;
				expect(res).to.have.status(StatusCodes.BAD_REQUEST);
				expect(res.body.reason).to.equal('Missing username parameter');
				done();
			});
	});

	it('should specify missing email parameter', (done) => {
		generateApiCall()
			.send({ username: '__A_USERNAME', password: '__A_PASSWORD' })
			.end((err, res) => {
				// eslint-disable-next-line no-unused-expressions
				expect(err).to.not.be.ok;
				expect(res).to.have.status(StatusCodes.BAD_REQUEST);
				expect(res.body.reason).to.equal('Missing email parameter');
				done();
			});
	});

	it('should specify missing email parameter', (done) => {
		generateApiCall()
			.send({ username: '__A_USERNAME', email: 'email@mail.com' })
			.end((err, res) => {
				// eslint-disable-next-line no-unused-expressions
				expect(err).to.not.be.ok;
				expect(res).to.have.status(StatusCodes.BAD_REQUEST);
				expect(res.body.reason).to.equal('Missing password parameter');
				done();
			});
	});

	it('should reject requests with already used credentials', (done) => {
		const email = 'email@mail.com';
		const username = '__username';
		const password = '__P4ssword';

		generateApiCall()
			.send({
				email,
				username,
				password,
			})
			.end((err, res) => {
				// eslint-disable-next-line no-unused-expressions
				expect(err).to.not.be.ok;
				expect(res).to.have.status(StatusCodes.OK);

				generateApiCall()
					.send({
						email,
						username,
						password,
					})
					.end((err, res) => {
						// eslint-disable-next-line no-unused-expressions
						expect(err).to.not.be.ok;
						expect(res).to.have.status(StatusCodes.CONFLICT);
					});
			});
	});
});
