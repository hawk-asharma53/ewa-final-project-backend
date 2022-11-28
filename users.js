import jwt from 'jsonwebtoken';

const BASE_URL = '/api';
const LOGIN = BASE_URL + '/login';
const SIGN_UP = BASE_URL + '/signup';
const PUT_USER = BASE_URL + '/users/:user_id';
const GET_USER = BASE_URL + '/users/:user_id';

const jwtSecretKey = 'csp_584_fall_2022_homeverse';
const jwtExpiry = 20 * 60;

export default function (app, executeMySqlQuery) {
  app.post(LOGIN, async (request, response) => {
    const { email, password } = request.body;

    let nodeResponse = {
      error: null,
      data: null,
    };
    let statusCode = 200;

    await executeMySqlQuery(
      'SELECT * FROM users where user_email = ? AND user_password = ?',
      [email, password],
      async (error, selectRows, _fields) => {
        if (error) {
          statusCode = 500;
          nodeResponse.error = {
            message:
              'An error occured while logging you in. Please try again later.',
          };
          response.status(statusCode).json(nodeResponse).end();
        } else {
          if (selectRows.length === 1) {
            const user = selectRows[0];
            const authToken = jwt.sign({ email }, jwtSecretKey, {
              algorithm: 'HS256',
              expiresIn: jwtExpiry,
            });
            await executeMySqlQuery(
              'UPDATE users SET auth_token = ? WHERE user_id = ?',
              [authToken, user.user_id],
              (error, _updateRows, _fields) => {
                if (error) {
                  statusCode = 500;
                  nodeResponse.error = {
                    message:
                      'An error occured while authenticating your login. Please try again later.',
                  };
                  response.status(statusCode).json(nodeResponse).end();
                } else {
                  nodeResponse.data = {
                    auth_token: authToken,
                    user: user,
                  };
                  response.status(statusCode).json(nodeResponse).end();
                }
              },
            );
          } else {
            statusCode = 500;
            nodeResponse.error = {
              message: 'Invalid Email-ID or Password.',
            };
            response.status(statusCode).json(nodeResponse).end();
          }
        }
      },
    );
  });

  app.post(SIGN_UP, (request, response) => {
    const { email, password, user_first_name, user_last_name, user_type } =
      request.body;

    let nodeResponse = {
      error: null,
      data: null,
    };

    let statusCode = 200;

    executeMySqlQuery(
      'SELECT user_id FROM users where user_email = ?',
      [email],
      (error, selectRows, _fields) => {
        if (error) {
          statusCode = 500;
          nodeResponse.error = {
            message:
              'An error occured while creating the account. Please try again later.',
          };
          console.log(error);
          response.status(statusCode).json(nodeResponse).end();
        } else {
          if (selectRows.length > 0) {
            statusCode = 500;
            nodeResponse.error = {
              message:
                'An Account already exists with this Email-ID. Please try another Email-ID',
            };
            response.status(statusCode).json(nodeResponse).end();
          } else {
            executeMySqlQuery(
              'INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_type) VALUES (?, ?, ?, ?, ?)',
              [user_first_name, user_last_name, email, password, user_type],
              (error, _insertRows, _fields) => {
                if (error) {
                  statusCode = 500;
                  nodeResponse.error = {
                    message:
                      'An error occured while creating the account. Please try again later.',
                  };
                  console.log(error);
                  response.status(statusCode).json(nodeResponse).end();
                } else {
                  nodeResponse.data = {
                    message: 'Account registered successfully!',
                  };
                  response.status(statusCode).json(nodeResponse).end();
                }
              },
            );
          }
        }
      },
    );
  });

  app.put(PUT_USER, (request, response) => {
    let statusCode = 200;

    let nodeResponse = {
      error: null,
      data: null,
    };

    const { user_id } = request.params;

    const {
      user_first_name,
      user_last_name,
      user_street,
      user_city,
      user_state,
      user_country,
      user_zip_code,
    } = request.body;

    let query = 'UPDATE users SET';

    let parameters = [];

    if (user_first_name) {
      query += ' user_first_name = ?,';
      parameters.push(user_first_name);
    }
    if (user_last_name) {
      query += ' user_last_name = ?,';
      parameters.push(user_last_name);
    }
    if (user_street) {
      query += ' user_street = ?,';
      parameters.push(user_street);
    }
    if (user_city) {
      query += ' user_city = ?,';
      parameters.push(user_city);
    }
    if (user_state) {
      query += ' user_state = ?,';
      parameters.push(user_state);
    }
    if (user_country) {
      query += ' user_country = ?,';
      parameters.push(user_country);
    }
    if (user_zip_code) {
      query += ' user_zip_code = ?,';
      parameters.push(user_zip_code);
    }

    if (parameters.length > 0) {
      query = query.slice(0, -1);
      query += ' WHERE user_id = ?';
      parameters.push(user_id);
      executeMySqlQuery(query, parameters, (error, rows, _fields) => {
        if (error) {
          console.log(error);
          statusCode = 500;
          nodeResponse.error = {
            message: 'There was an error while updating the user profile.',
          };
          response.status(statusCode).json(nodeResponse).end();
        } else {
          nodeResponse.data = {
            message: 'User profile updated successfully.',
          };
          response.status(statusCode).json(nodeResponse).end();
        }
      });
    } else {
      statusCode = 500;
      nodeResponse.error = {
        message: 'No parameters updated',
      };
      response.status(statusCode).json(nodeResponse).end();
    }
  });

  app.get(GET_USER, (request, response) => {
    const { user_id } = request.params;

    let nodeResponse = {
      error: null,
      data: null,
    };

    let statusCode = 200;

    executeMySqlQuery(
      'SELECT * FROM users WHERE user_id = ?',
      [user_id],
      (error, rows, _fields) => {
        if (error) {
          statusCode = 500;
          nodeResponse.error = {
            message: 'No user found',
          };
          response.status(statusCode).json(nodeResponse).end();
        } else if (rows.length > 0) {
          const user = rows[0];
          nodeResponse.data = {
            message: 'User found',
            user: user,
          };
          response.status(statusCode).json(nodeResponse).end();
        }
      },
    );
  });
}
