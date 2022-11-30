CREATE MIGRATION m1zsidq4s7uprna6rkvxhtzfyygnzfihezekhvviettaj3qvidja7a
    ONTO m1izstaqugupisid2kaqu2wgsjq45eumqasg3uhadrwjljkfet6s7q
{
  ALTER TYPE default::Product {
      ALTER PROPERTY _id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
