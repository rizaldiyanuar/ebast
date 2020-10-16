const Pool = require("pg").Pool;

const pool = new Pool({
    user: "ical",
    password: "ical123",
    database: "ebast",
    host: "localhost",
    post: "5432"
});

module.exports = pool;