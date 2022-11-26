import express from 'express';
import { request, response } from 'express';
import morgan from 'morgan';
import { createConnection } from 'mysql2';
import cors from 'cors';
import users from './users.js';
import products from './products.js';
import services from './services.js';
import addresses from './addresses.js';
import stores from './stores.js';
import bodyParser from 'body-parser';
import config from './config/db.config.js';

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(morgan('short'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const NODE_PORT = 3001;
let NODE_SQL_CONNECTION;
let NODE_MONGO_CONNECTION;

app.listen(NODE_PORT, (_request, _response) => {
  console.log('HomeVerse Server is up');
  NODE_SQL_CONNECTION = createConnection(config);

  const executeMySqlQuery = (query, parameters, callback) => {
    NODE_SQL_CONNECTION.query(query, parameters, (error, rows, fields) =>
      callback(error, rows, fields),
    );
  };

  NODE_SQL_CONNECTION.connect(error => {
    if (error) {
      console.error(error);
      throw error;
    } else {
      console.log('HomeVerse SQL is up');
      users(app, executeMySqlQuery);
      products(app);
      services(app);
      stores(app);
      addresses(app);
    }
  });
});
