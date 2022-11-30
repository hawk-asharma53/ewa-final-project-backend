CREATE MIGRATION m1l67c3ttt4z6lxwizkdwctryrup5sb2hopciod6whghfxdmat2bga
    ONTO m1wokcaxiqe3hcifiuszymczwvzi5hdl2ha6cl6gqxwdmh4bgxucva
{
  ALTER TYPE default::Orders {
      CREATE PROPERTY orderDate -> std::datetime;
  };
};
