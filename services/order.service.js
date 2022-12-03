import config from '../config/db.config.js';
import { createConnection } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

const ongoingStatuses = [
  'Processing',
  'Packaging',
  'Ready for pickup',
  'Out for Delivery',
];
const revenueStatuses = [
  'Processing',
  'Packaging',
  'Ready for pickup',
  'Out for Delivery',
  'Completed',
];

async function addOrder(order) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      var id = uuidv4();
      connection.query(
        'Insert into orders values (?,?,?,?,?,?,?,?,null,?)',
        [
          id,
          order.userId,
          order.storeId,
          order.status,
          order.total,
          order.paymentId,
          order.type,
          order.orderDate,
          order.address,
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

async function updateOrderStatus(orderId, status) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Update orders set status = ? where id = ?',
        [status, orderId],
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

async function getByIds(ids) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orders where id in (?)',
        [ids],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getByStore(storeId) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orders where storeId = ? order by orderDate desc',
        [storeId],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getByUser(userId) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orders where userId = ? order by orderDate desc',
        [userId],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getOverallOngoingOrders() {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orders where status in (?)',
        [ongoingStatuses],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getOverallOngoingOrdersByStore(storeId) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orders where status in (?) and storeId = ?',
        [ongoingStatuses, storeId],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getOngoingOrdersForDates(startDate, endDate) {
  return new Promise((resolve, reject) => {
    try {
      console.log(startDate);
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orders where status in (?) and orderDate between ? and ?',
        [ongoingStatuses, startDate, endDate],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getOngoingOrdersForDatesAndStore(startDate, endDate, storeId) {
  return new Promise((resolve, reject) => {
    try {
      console.log(startDate);
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select * from orders where status in (?) and orderDate between ? and ? and storeId = ?',
        [ongoingStatuses, startDate, endDate, storeId],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getTotalRevenueForDate(startDate, endDate) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select sum(total) from orders where status in (?) and orderDate between ? and ?',
        [revenueStatuses, startDate, endDate],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getTotalRevenueForDateAndStore(startDate, endDate, storeId) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'Select sum(total) from orders where status in (?) and orderDate between ? and ? and storeId = ?',
        [revenueStatuses, startDate, endDate, storeId],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getWeeklyRevenue() {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'select week, sum(total) from WeeklyRevenue group by week order by week',
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

async function getWeeklyRevenueByStore(storeId) {
  return new Promise((resolve, reject) => {
    try {
      var connection = createConnection(config);
      connection.connect();
      connection.query(
        'select week, total from WeeklyRevenue where storeId = ? order by week',
        [storeId],
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        },
      );
      connection.end();
    } catch (error) {
      reject(error);
    }
  });
}

var orderService = {
  addOrder,
  updateOrderStatus,
  getByIds,
  getByStore,
  getByUser,
  getOverallOngoingOrders,
  getOverallOngoingOrdersByStore,
  getOngoingOrdersForDates,
  getOngoingOrdersForDatesAndStore,
  getTotalRevenueForDate,
  getTotalRevenueForDateAndStore,
  getWeeklyRevenue,
  getWeeklyRevenueByStore
};

export default orderService;
