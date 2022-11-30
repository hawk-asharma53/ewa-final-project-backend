CREATE MIGRATION m1padmwrv5wkyv6bgwfi2pl4kc3ulopyuk6lcl5sfy4hkisi5z46ha
    ONTO m1t6zbp57na4wq7ts3xaoqbv7ar7g37skdg5stgwweekoszhsfasjq
{
  ALTER TYPE default::Orders {
      ALTER PROPERTY _id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
