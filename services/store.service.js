import config from '../config/db.config.js';
import { createConnection } from 'mysql2';

async function getAll() {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from stores',
        function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        },
      );
      connection.end();
    } catch (error) {
      reject(error)
    }
  });
}

async function getByIds( ids ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from stores where id in (?)',
        [ ids ],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        },
      );
      connection.end();
    } catch (error) {
      reject(error)
    }
  });
}

var storeService = { getAll, getByIds }

export default storeService;