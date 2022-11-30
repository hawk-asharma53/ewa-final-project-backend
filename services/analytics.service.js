import * as edgedb from 'edgedb';
import edgedbConfig from '../config/edgedb.config.js';

async function getMostSoldProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const client = edgedb.createClient(edgedbConfig.connectionName);
      const result = await client.query(`
          select Product{
            _id,
            title,
            orders := .<PRODUCTS[is Orders] { _id },
            ordered_count := count(.<PRODUCTS[is Orders] { _id })
          } 
          order by .ordered_count desc
          Limit 10;
        `);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function getMostSoldServices() {
  return new Promise(async (resolve, reject) => {
    try {
      const client = edgedb.createClient(edgedbConfig.connectionName);
      const result = await client.query(`
          select Service{
            _id,
            title,
            orders := .<SERVICES[is Orders] { _id },
            ordered_count := count(.<SERVICES[is Orders] { _id })
          } 
          order by .ordered_count desc
          Limit 10; 
          `);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function getPopularInStore( storeId ) {
  return new Promise(async (resolve, reject) => {
    try {
      const client = edgedb.createClient(edgedbConfig.connectionName);
      const result = await client.query(`
          select Product{
            _id,
            title,
            orders := .<PRODUCTS[is Orders] { _id },
            ordered_count := count(.<PRODUCTS[is Orders] { _id })
          } 
          filter .orders.ORDERED_FROM._id = ${storeId}
          order by .ordered_count desc
          Limit 10;
          `);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function getBoughtInZipcode( zipcode ) {
  return new Promise(async (resolve, reject) => {
    try {
      const client = edgedb.createClient(edgedbConfig.connectionName);
      const result = await client.query(`
          select Product{
            _id,
            title,
            orders := .<PRODUCTS[is Orders] { _id },
            ordered_count := count(.<PRODUCTS[is Orders] { _id })
          } 
          filter .orders.ORDERED_AT.zipcode = ${zipcode}
          order by .ordered_count desc
          Limit 10;
          `);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

var analyticsService = { getMostSoldProducts, getMostSoldServices, getPopularInStore, getBoughtInZipcode };

export default analyticsService;
