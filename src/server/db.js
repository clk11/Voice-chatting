const { Pool } = require('pg');
const context = new Pool({
	user: 'postgres',
	password: '7139852465',
	host: 'localhost',
	port: 5432,
	database: 'voicedb',
});

module.exports = {
	query: (text, params) => context.query(text, params),
};
