import jwt from 'jsonwebtoken';

const USERS_BASE_URL = '/users';
const LOGIN = '/login';
const SIGN_UP = '/signup';

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
          console.error(error);
          statusCode = 500;
          nodeResponse.error = {
            message:
              'An error occured while logging you in. Please try again later.',
          };
          response.json(nodeResponse).status(statusCode).end();
        } else {
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
                console.error(error);
                statusCode = 500;
                nodeResponse.error = {
                  message:
                    'An error occured while authenticating your login. Please try again later.',
                };
                response.json(nodeResponse).status(statusCode).end();
              } else {
                nodeResponse.data = {
                  auth_token: authToken,
                  user: user,
                };
                response.json(nodeResponse).status(statusCode).end();
              }
            },
          );
        }
      },
    );
  });

  app.post(SIGN_UP, (request, response) => {
    const { email, password, firstName, lastName } = request.body;

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
          console.error(error);
          statusCode = 500;
          nodeResponse.error = {
            message:
              'An error occured while creating the account. Please try again later.',
          };
          response.json(nodeResponse).status(statusCode).end();
        } else {
          if (selectRows.length > 0) {
            statusCode = 500;
            nodeResponse.error = {
              message:
                'An Account already exists with this Email-ID. Please try another Email-ID',
            };
            response.json(nodeResponse).status(statusCode).end();
          } else {
            executeMySqlQuery(
              'INSERT INTO users (user_first_name, user_last_name, user_email, user_password) VALUES (?, ?, ?, ?)',
              [firstName, lastName, email, password],
              (error, _insertRows, _fields) => {
                if (error) {
                  console.error(error);
                  statusCode = 500;
                  nodeResponse.error = {
                    message:
                      'An error occured while creating the account. Please try again later.',
                  };
                  response.json(nodeResponse).status(statusCode).end();
                } else {
                  nodeResponse.data = {
                    message: 'Account registered successfully!',
                  };
                  response.json(nodeResponse).status(statusCode).end();
                }
              },
            );
          }
        }
      },
    );
  });
}
