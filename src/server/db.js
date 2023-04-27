const { Pool } = require('pg');
const context = new Pool({
	user: '',
	password: '',
	host: ',
	port: ,
	database: '',
});

module.exports = {
	query: (text, params) => context.query(text, params),
};
