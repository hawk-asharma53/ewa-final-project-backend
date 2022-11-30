CREATE MIGRATION m1tzbvfrqlsdcgffgbr7f3zajdnkrxabnhskbqalrrrei4cw7emdza
    ONTO m1zunumrbwdbqdtfebbeungqsrsh5fcz2x6art7zgz3lzdgmto3klq
{
  ALTER TYPE default::Store {
      ALTER PROPERTY _id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
