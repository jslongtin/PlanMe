// bin/migrate.js

var db = require('../routes/database.js');
db.sequelize.sync();