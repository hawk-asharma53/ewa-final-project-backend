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
          if (error) reject(error);
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
          if (error) reject(error);
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
          if (error) reject(error);
          resolve(results)
        },
      );
      connection.end();
    } catch (error) {      
      reject(error)
    }
  });
}

async function getServiceCount( ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        `Select a.itemId, s.title, a.quantity from
        (select itemId, sum(quantity) as quantity  from ServiceCount sc group by itemId) as a
        inner join services s on s.id = a.itemId`,
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results)
        },
      );
      connection.end();
    } catch (error) {      
      reject(error)
    }
  });
}

async function getServiceCountByStore( storeId ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        `Select a.itemId, s.title, a.quantity, a.storeId from
        (select * from ServiceCount sc where storeId = ?) as a
        inner join services s on s.id = a.itemId`,
        [storeId],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results)
        },
      );
      connection.end();
    } catch (error) {      
      reject(error)
    }
  });
}

var serviceService = { getAll, getByIds, getByCategory, getServiceCount, getServiceCountByStore }

export default serviceService;