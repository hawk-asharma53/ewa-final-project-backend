import { MongoClient } from 'mongodb'
import mongoConfig from '../config/mongo.config.js';

async function addReview(review) {
  return new Promise( async (resolve, reject) => {
    var client = new MongoClient(mongoConfig.connectionString);
    try {
      var reviewsCollection = client.db("test").collection("reviews");
      await reviewsCollection.insertOne( review );
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      await client.close();
    }
  });
}

var reviewService = { addReview };

export default reviewService;
