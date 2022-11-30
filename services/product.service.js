import config from '../config/db.config.js';
import { createConnection } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

async function getAll() {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from products',
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
        'Select * from products where id in (?)',
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
        'Select * from products where categoryid = ?',
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

async function createProduct(product) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      var id = uuidv4();
      connection.query(
        'Insert into products values (?,?,?,?,?,?,?,?)',
        [
          id,
          product.title,
          product.categoryid,
          product.subcategory,
          product.image,
          product.rating,
          product.price,
          product.isActive
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

async function updateProduct(product) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        `Update products set 
        title = ?,
        categoryid = ?,
        subcategory = ?,
        image = ?,
        price = ?,
        isActive = ?
        where id = ?;`,
        [
          product.title,
          product.categoryid,
          product.subcategory,
          product.image,
          product.price,
          product.isActive,
          product.id
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

async function getProductCount( ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        `Select a.itemId, p.title, a.quantity from
        (select itemId, sum(quantity) as quantity from ItemCount sc group by itemId) as a
        inner join products p on p.id = a.itemId
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

async function getProductCountByStore( storeId ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        `Select a.itemId, p.title, a.quantity, a.storeId from
        (select * from ItemCount sc where storeId = ?) as a
        inner join products p on p.id = a.itemId
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

var productService = { getAll, getByIds, getByCategory, createProduct, getProductCount, getProductCountByStore, updateProduct }

export default productService;