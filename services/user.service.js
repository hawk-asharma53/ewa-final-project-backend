import config from '../config/db.config.js';
import { createConnection } from 'mysql2';

async function getByIds(ids) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from users where user_id in (?)',
        [ids],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

var userService = { getByIds };

export default userService;