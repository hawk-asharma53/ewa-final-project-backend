CREATE MIGRATION m1v4ooslv6ryscfm66m3tddxtzmbvdphtg5mihhblrkulhww2dmbva
    ONTO m1r3hw5wjy236ogkgprnkoggtth4yzt25u6t5xbsw54b2z3724p6wa
{
  ALTER TYPE default::User {
      ALTER PROPERTY _id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
