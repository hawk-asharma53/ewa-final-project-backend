CREATE MIGRATION m1f4jcz2kbdr7gxtk4lwo3igrx53ssrzfor3qfg6hiesuofs44tbqa
    ONTO m1padmwrv5wkyv6bgwfi2pl4kc3ulopyuk6lcl5sfy4hkisi5z46ha
{
  ALTER TYPE default::Orders {
      DROP LINK IN_CATEGORY;
  };
};
