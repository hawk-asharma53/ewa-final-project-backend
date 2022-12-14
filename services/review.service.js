import { MongoClient } from 'mongodb'
import mongoConfig from '../config/mongo.config.js';

async function addReview(review) {
  return new Promise( async (resolve, reject) => {
    var client = new MongoClient(mongoConfig.connectionString);
    try {
      var reviewsCollection = client.db(mongoConfig.dbName).collection("reviews");
      await reviewsCollection.insertOne( review );
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      await client.close();
    }
  });
}

async function findReviews( query ) {
  return new Promise( async (resolve, reject) => {
    var client = new MongoClient(mongoConfig.connectionString);
    try {
      var reviewsCollection = client.db(mongoConfig.dbName).collection("reviews");
      var cursor = reviewsCollection.find( query );
      var reviews = [];
      await cursor.forEach((item) => { reviews.push(item) });
      resolve(reviews);
    } catch (error) {
      reject(error);
    } finally {
      await client.close();
    }
  });
}

var reviewService = { addReview, findReviews };

export default reviewService;
