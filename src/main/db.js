const sqlite3 = require('sqlite3').verbose();

const isProd = process.env.NODE_ENV === 'production';
const ASSETS_PATH = isProd ? './resources/assets' : './assets';
const dbfile = `${ASSETS_PATH}/main.db`;

const db = new sqlite3.Database(dbfile);

// for async, await
db.query = function (sql, params) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.all(sql, params, function (error, rows) {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

export const getData = async () => {
  // const stmt = 'select count(*) from users';
  const query = 'SELECT id, user_id, password FROM users';
  let result = [];
  let a = await db.all(query);
  // db.serialize(() => {
  //   db.each(query, (err, row) => {
  //     const data = `${row.id} - ${row.user_id}[${row.password}]`;
  //     console.log(data);
  //     result.push(data);
  //   });
  // });
  return result;
};

export const getUser = async (id) => {
  const query = 'SELECT * FROM users';
  const user = await db.query(query, []);
  return user;
};

const DB = { getData, getUser };
export default DB;
