const sqlite3 = require("sqlite3").verbose();

const isProd = process.env.NODE_ENV === 'production';
const ASSETS_PATH = isProd ? './resources/assets' : './assets';
const dbfile = `${ASSETS_PATH}/main.db`;

const db = new sqlite3.Database(dbfile);

export const getData = (event) => {
  // const stmt = 'select count(*) from users';
  db.serialize(() => {
    db.each('SELECT id, user_id, password FROM users', (err, row) => {
      const data = `${row.id} - ${row.user_id}[${row.password}]`;
      console.log(data);
      event.sender.send('test', data);
    });
  });
};