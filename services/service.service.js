import config from '../config/db.config.js';
import { createConnection } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

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
        (select itemId, sum(quantity) as quantity from ItemCount sc group by itemId) as a
        inner join services s on s.id = a.itemId
        order by a.quantity desc`,
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
        (select * from ItemCount sc where storeId = ?) as a
        inner join services s on s.id = a.itemId
        order by a.quantity desc`,
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

async function createService(service) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      var id = uuidv4();
      connection.query(
        'Insert into services values (?,?,?,?,?,?,?,?)',
        [
          id,
          service.title,
          service.categoryid,
          service.subcategory,
          service.image,
          service.rating,
          service.price,
          service.isActive
        ],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(id);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function updateService(service) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        `Update services set 
        title = ?,
        categoryid = ?,
        subcategory = ?,
        image = ?,
        price = ?,
        isActive = ?
        where id = ?;`,
        [
          service.title,
          service.categoryid,
          service.subcategory,
          service.image,
          service.price,
          service.isActive,
          service.id
        ],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(true);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

var serviceService = { getAll, getByIds, getByCategory, getServiceCount, getServiceCountByStore, createService, updateService }

export default serviceService;