const { createClient } = require('@supabase/supabase-js');
const Meilisearch = require('meilisearch');
const {
	supabaseUrl,
	supabasePublicKey,
	meilisearchHost,
	meilisearchMasterKey,
} = require('./config');

const supabase = createClient(supabaseUrl, supabasePublicKey);

module.exports = supabase;
module.exports.searchEngine = new Meilisearch({
	host: meilisearchHost,
	apiKey: meilisearchMasterKey,
});
