import config from '../config/db.config.js';
import { createConnection } from 'mysql2';

async function getAll() {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from services',
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
        'Select * from services where id in (?)',
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

async function getByCategory( category_id ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from services where categoryid = ?',
        [category_id],
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

var productService = { getAll, getByIds, getByCategory }

export default productService;