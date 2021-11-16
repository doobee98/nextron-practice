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

const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const users = await db.query(query, []);
  return users;
};

const getUser = async (id) => {
  const query = `SELECT * FROM users WHERE id = '${id}'`;
  const user = await db.query(query, []);
  return user;
};

const addUser = async ({ id, password, name, car_number }) => {
  const query = `INSERT INTO users VALUES ('${id}', '${password}', '${name}', '${car_number}')`;
  const user = await db.query(query, []);
  return user;
};

const updateUser = async ({ id, password, name, car_number }) => {
  const query = `UPDATE users SET password='${password}', name='${name}', car_number='${car_number}' WHERE id='${id}'`;
  await db.query(query, []);
};

const DB = { getAllUsers, getUser, addUser };
export default DB;
