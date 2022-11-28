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
        'Select * from products where id in (?)',
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
        'Select * from products where categoryid = ?',
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
          product.categoryId,
          product.subcategory,
          product.image,
          product.rating,
          product.price,
          product.isActivew
        ],
        function (error, results, fields) {
          if (error) throw error;
          resolve(id);
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
        'select title, id, sum(quantity) as quantity from ProductCount group by id',
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

async function getProductCountByStore( storeId ) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'select title, id, quantity from ProductCount where storeId = ?',
        [storeId],
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

var productService = { getAll, getByIds, getByCategory, createProduct, getProductCount, getProductCountByStore }

export default productService;