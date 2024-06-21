require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const databaseInfo = {
  'name': process.env.DATABASE,

  'tables': {
    'prefix': { 
      'columns': [ 
        {
          'name': 'guildId',
          'type': 'TEXT',
          'dflt_value': null
        },
        {
          'name': 'prefix',
          'type': 'TEXT',
          'dflt_value': null
        }
      ],
      'primaryKey': [
        'guildId'
      ]
    }
  }
}

const db = new sqlite3.Database(databaseInfo.name, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the database.');
});


db.serialize(() => {
  for (const table in databaseInfo.tables) {
    const columns = databaseInfo.tables[table].columns.map(column => `${column.name} ${column.type}${column.dflt_value ? ` DEFAULT ${column.dflt_value}` : ''}`).join(', ');
    const primaryKey = databaseInfo.tables[table].primaryKey.join(', ');

    db.run(`CREATE TABLE IF NOT EXISTS ${table} (${columns}, PRIMARY KEY (${primaryKey}))`, (err) => {
      if (err) return console.error(err.message);

      db.all(`PRAGMA table_info(${table})`, (err, rows) => {
        let isSchemaValid = true;

        if (rows.length !== databaseInfo.tables[table].columns.length) {
          isSchemaValid = false;
        } else {
          for (let i = 0; i < rows.length; i++) {
            const dbColumn = rows[i];
            const expectedColumn = databaseInfo.tables[table].columns.find(column => column.name === dbColumn.name);

            if (!expectedColumn || 
                expectedColumn.type !== dbColumn.type || 
                expectedColumn.dflt_value !== dbColumn.dflt_value) {
                  console.log(expectedColumn.dflt_value ,dbColumn.dflt_value);
              isSchemaValid = false;
              break;
            }
          }
        }

        if (!isSchemaValid) {
          db.run(`DROP TABLE IF EXISTS ${table}`, (err) => {
            if (err) return console.error(err.message);

            db.run(`CREATE TABLE ${table} (${columns}, PRIMARY KEY (${primaryKey}))`, (err) => {
              if (err) return console.error(err.message);
              console.log(`Table ${table} has been recreated.`);
            });
          });
        }
      });
    });
  }
});

module.exports = db;