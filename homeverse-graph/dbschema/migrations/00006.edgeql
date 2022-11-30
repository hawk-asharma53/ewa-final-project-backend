CREATE MIGRATION m1izstaqugupisid2kaqu2wgsjq45eumqasg3uhadrwjljkfet6s7q
    ONTO m1ru3lyku6sboncsde2rz3nobxc245fycxlelsbwaj6ls74fxsrbaa
{
  ALTER TYPE default::Category {
      ALTER PROPERTY _id {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
