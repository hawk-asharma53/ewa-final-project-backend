import config from '../config/db.config.js';
import { createConnection } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

async function addAddress( address ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      var id = uuidv4()
      connection.query(
        'Insert into addresses values (?,?,?,?,?,?)',
        [ id, address.userId, address.street, address.aptno, address.city, address.zipcodde ],
        function (error, results, fields) {
          if (error) throw error;
          resolve(id)
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
        'Select * from addresses where id in (?)',
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

async function getByUser( userId ) {
    return new Promise((resolve, reject) => {
      try {
        var connection = createConnection(config);
        connection.connect();
        connection.query(
          'Select * from addresses where userId = ?',
          [userId],
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

var addressService = { addAddress, getByIds, getByUser }

export default addressService;