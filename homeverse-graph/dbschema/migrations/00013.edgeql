CREATE MIGRATION m1wokcaxiqe3hcifiuszymczwvzi5hdl2ha6cl6gqxwdmh4bgxucva
    ONTO m1f4jcz2kbdr7gxtk4lwo3igrx53ssrzfor3qfg6hiesuofs44tbqa
{
  ALTER TYPE default::Orders {
      DROP PROPERTY orderDate;
  };
};
