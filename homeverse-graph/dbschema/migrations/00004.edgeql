CREATE MIGRATION m1qyji5qvzk5idfs2ix25v2rt25n3cpl3kvxakicdftkdzfb7cwjza
    ONTO m1755cc3ru5m2wlcrvn5qcbgc3hfulitxaz42o47vzx42s6n5722fq
{
  ALTER TYPE default::Store {
      DROP PROPERTY latitude;
      DROP PROPERTY longitude;
  };
};
