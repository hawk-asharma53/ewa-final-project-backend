CREATE MIGRATION m1zunumrbwdbqdtfebbeungqsrsh5fcz2x6art7zgz3lzdgmto3klq
    ONTO initial
{
  CREATE TYPE default::Address {
      CREATE PROPERTY _id -> std::str;
      CREATE PROPERTY city -> std::str;
      CREATE PROPERTY street -> std::str;
      CREATE PROPERTY zipcode -> std::int16;
  };
  CREATE TYPE default::Category {
      CREATE PROPERTY _id -> std::int16;
      CREATE PROPERTY title -> std::str;
  };
  CREATE TYPE default::Product {
      CREATE REQUIRED LINK IN_CATEGORY -> default::Category;
      CREATE PROPERTY _id -> std::str;
      CREATE PROPERTY price -> std::float32;
      CREATE PROPERTY rating -> std::float32;
      CREATE PROPERTY title -> std::str;
  };
  CREATE TYPE default::Service {
      CREATE REQUIRED LINK IN_CATEGORY -> default::Category;
      CREATE PROPERTY _id -> std::str;
      CREATE PROPERTY price -> std::float32;
      CREATE PROPERTY rating -> std::float32;
      CREATE PROPERTY title -> std::str;
  };
  CREATE TYPE default::Store {
      CREATE PROPERTY _id -> std::int16;
      CREATE PROPERTY address -> std::str;
      CREATE PROPERTY latitude -> std::float64;
      CREATE PROPERTY longitude -> std::float64;
      CREATE PROPERTY name -> std::str;
      CREATE PROPERTY zipcode -> std::int16;
  };
  CREATE TYPE default::User {
      CREATE PROPERTY _id -> std::int16;
      CREATE PROPERTY email -> std::str;
      CREATE PROPERTY firstName -> std::str;
      CREATE PROPERTY lastName -> std::str;
  };
  CREATE TYPE default::Orders {
      CREATE LINK ORDERED_AT -> default::Address;
      CREATE REQUIRED LINK IN_CATEGORY -> default::Category;
      CREATE LINK ORDERED_BY -> default::User;
      CREATE LINK ORDERED_FROM -> default::Store;
      CREATE MULTI LINK PRODUCTS -> default::Product;
      CREATE MULTI LINK SERVICES -> default::Service;
      CREATE PROPERTY _id -> std::str;
      CREATE PROPERTY orderDate -> std::datetime;
      CREATE PROPERTY price -> std::float32;
      CREATE PROPERTY type -> std::str;
  };
};
