CREATE MIGRATION m1755cc3ru5m2wlcrvn5qcbgc3hfulitxaz42o47vzx42s6n5722fq
    ONTO m1tzbvfrqlsdcgffgbr7f3zajdnkrxabnhskbqalrrrei4cw7emdza
{
  ALTER TYPE default::Store {
      DROP PROPERTY name;
  };
};
