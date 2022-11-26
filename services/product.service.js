import config from '../config/db.config.js';
import { createConnection } from 'mysql2';

async function getAll() {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from products',
        function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        },
      );
      connection.end();
    } catch (error) {}
  });
}

var productService = { getAll }

export default productService;