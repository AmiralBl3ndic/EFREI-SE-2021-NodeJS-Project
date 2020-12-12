const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 16);

class UUIDService {
	static generateNanoId() {
		return nanoid();
	}
}

module.exports = UUIDService;
