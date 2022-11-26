import config from '../config/db.config.js';
import { createConnection } from 'mysql2';

async function addOrderItem(orderItem) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Insert into orderItem values (?,?,?)',
        [orderItem.orderId, orderItem.itemId, orderItem.quantity],
        function (error, results, fields) {
          if (error) throw error;
          resolve();
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getByOrderId(orderId) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orderItem where orderId = ?',
        [orderId],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

var orderItemService = { addOrderItem, getByOrderId };

export default orderItemService;
