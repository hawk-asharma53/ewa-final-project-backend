module default {
    type Store {
        property _id -> int16 {
            constraint exclusive;
        }
        property address -> str;
        property zipcode -> int32;
    }

    type Category {
        property _id -> int16 {
            constraint exclusive;
        }
        property title -> str;
    }

    type Product {
        property _id -> str {
            constraint exclusive;
        }
        property title -> str;
        property rating -> float32;
        property price -> float32;
        required link IN_CATEGORY -> Category;
    }

    type Service {
        property _id -> str {
            constraint exclusive;
        }
        property title -> str;
        property rating -> float32;
        property price -> float32;
        required link IN_CATEGORY -> Category;
    }
    
    type Orders {
        property _id -> str {
            constraint exclusive;
        }
        property type -> str;
        property price -> float32;
        property orderDate -> datetime;

        multi link PRODUCTS -> Product;
        multi link SERVICES -> Service;
        link ORDERED_BY -> User;
        link ORDERED_FROM -> Store;
        link ORDERED_AT -> Address;
    }

    type User {
        property _id -> int16 {
            constraint exclusive;
        }
        property email -> str;
        property firstName -> str;
        property lastName -> str;
    }

    type Address {
        property _id -> str {
            constraint exclusive;
        }
        property street -> str;
        property city -> str;
        property zipcode -> int32;
    }
}
