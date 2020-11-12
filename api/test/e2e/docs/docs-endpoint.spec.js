const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /api/docs', () => {
	it('is is HTTP 200', (done) => {
		chai
			.request(server)
			.get('/docs')
			.end((err, res) => {
				// eslint-disable-next-line no-unused-expressions
				expect(err).to.not.be.ok;
				expect(res).to.have.status(200);
				done();
			});
	});
});
