import config from '../config/db.config.js';
import { createConnection } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

async function addOrder(order) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      var id = uuidv4();
      connection.query(
        'Insert into orders values (?,?,?,?,?,?,?,?, null)',
        [
          id,
          order.userId,
          order.storeId,
          order.status,
          order.total,
          order.paymentId,
          order.type,
          order.orderDate,
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

async function updateOrderStatus(orderId, status) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Update orders set status = ? where id = ?',
        [status, orderId],
        function (error, results, fields) {
          if (error) throw error;
          resolve(true);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

var orderService = { addOrder, updateOrderStatus };

export default orderService;