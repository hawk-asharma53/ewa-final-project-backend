CREATE MIGRATION m1t6zbp57na4wq7ts3xaoqbv7ar7g37skdg5stgwweekoszhsfasjq
    ONTO m1v4ooslv6ryscfm66m3tddxtzmbvdphtg5mihhblrkulhww2dmbva
{
  ALTER TYPE default::Address {
      ALTER PROPERTY _id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Address {
      ALTER PROPERTY zipcode {
          SET TYPE std::int32;
      };
  };
};
