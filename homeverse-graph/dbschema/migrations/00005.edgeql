CREATE MIGRATION m1ru3lyku6sboncsde2rz3nobxc245fycxlelsbwaj6ls74fxsrbaa
    ONTO m1qyji5qvzk5idfs2ix25v2rt25n3cpl3kvxakicdftkdzfb7cwjza
{
  ALTER TYPE default::Store {
      ALTER PROPERTY zipcode {
          SET TYPE std::int32;
      };
  };
};
