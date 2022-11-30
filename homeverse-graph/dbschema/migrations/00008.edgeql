CREATE MIGRATION m1r3hw5wjy236ogkgprnkoggtth4yzt25u6t5xbsw54b2z3724p6wa
    ONTO m1zsidq4s7uprna6rkvxhtzfyygnzfihezekhvviettaj3qvidja7a
{
  ALTER TYPE default::Service {
      ALTER PROPERTY _id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
