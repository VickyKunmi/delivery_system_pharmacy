import { Sequelize, DataTypes } from "sequelize";
const { STRING, INTEGER, DATE, BOOLEAN, NUMBER, DECIMAL, FLOAT, ARRAY, TEXT } = DataTypes;

const sequelize = new Sequelize("greenlightpharmacy", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const Categories = sequelize.define(
  "categories",
  {
    title: { type: STRING, allowNull: false },
    description: { type: STRING, allowNull: false },
    image: { type: STRING, allowNull: false },
  },
  {
    tableName: "categories",
  }
);

const Riders = sequelize.define(
  "riders",
  {
    name: { type: STRING, allowNull: false },
    username: { type: STRING, allowNull: false, unique: true },
    password: { type: STRING, allowNull: false },
    address: { type: STRING, allowNull: false },
    available_status: { type: BOOLEAN, allowNull: false },
    plate_number: { type: STRING, allowNull: false },
    phone_number: { type: STRING, allowNull: false },
  },
  {
    tableName: "riders",
  }
);

const Users = sequelize.define(
  "user",
  {
    first_name: { type: STRING, allowNull: false },
    last_name: { type: STRING, allowNull: false },
    password: { type: STRING, allowNull: false },
    phone_number: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10],
          msg: "Phone number must be exactly 10 digits long.",
        },
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid email format.",
        },
      },
    },
  },
  {
    tableName: "user",
  }
);

const Drugs = sequelize.define(
  "drugs",
  {
    name: { type: STRING, allowNull: false },
    description: { type: STRING, allowNull: false },
    price: { type: FLOAT, allowNull: false },
    category: { type: STRING, allowNull: false },
    price_symbol: { type: STRING, allowNull: false },
    image: { type: STRING, allowNull: false },
  },
  {
    tableName: "drugs",
  }
);

const Carts = sequelize.define(
  "carts",
  {
    name: { type: STRING, allowNull: false },
    quantity: { type: INTEGER, allowNull: false },
    price: { type: DECIMAL, allowNull: false },
    price_symbol: { type: STRING, allowNull: false },
    image: { type: STRING, allowNull: false },
    total: { type: DECIMAL, allowNull: false },
  },
  {
    tableName: "carts",
  }
);

const OrderDetails = sequelize.define(
  "orderdetails",
  {
    name: { type: STRING, allowNull: false },
    quantity: { type: INTEGER, allowNull: false },
    price: { type: DECIMAL, allowNull: false },
    price_symbol: { type: STRING, allowNull: false },
    image: { type: STRING, allowNull: false },
    // total: { type: DECIMAL, allowNull: false },
  },
  {
    tableName: "orderdetails",
  }
);

const Orders = sequelize.define(
  "orders",
  {
    customer_email: {
      type: STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    address: { type: STRING, allowNull: false },
    total: { type: DECIMAL, allowNull: false },
    status: { type: DECIMAL, allowNull: false },
    payment_method: { type: DECIMAL, allowNull: false },
  },
  {
    tableName: "orders",
  }
);

const FeaturedDrugs = sequelize.define(
  "featured_drugs",
  {
    name: { type: STRING, allowNull: false },
    description: { type: STRING, allowNull: false },
    price: { type: FLOAT, allowNull: false },
    category: { type: STRING, allowNull: false },
    price_symbol: { type: STRING, allowNull: false },
    image: { type: STRING, allowNull: false },
  },
  {
    tableName: "featured_drugs",
  }
);

const Delivery = sequelize.define(
  "deliveries",
  {
    name: { type: STRING, allowNull: false },
    phone_no: { type: STRING, allowNull: false },
    user_email: { type: STRING, allowNull: false },
    longitude: { type: FLOAT, allowNull: false },
    latitude: { type: FLOAT, allowNull: false },
    orderdetails: { type: TEXT, allowNull: false },
    totalfee: {type: FLOAT, allowNull: false},
    deliveryFee: {type: FLOAT, allowNull: false},
    drugfee: {type: FLOAT, allowNull: false},

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "deliveries",
    timestamps: true, 
    createdAt: "createdAt", 
    updatedAt: "updatedAt", 
  }
);

const Location = sequelize.define(
  "locations",
  {
    title: { type: STRING, allowNull: false },
    description: { type: STRING, allowNull: false },
  },
  {
    tableName: "locations",
  }
);

const LandMarks = sequelize.define(
  "landmarks",
  {
    title: { type: STRING, allowNull: false },
    description: { type: STRING, allowNull: false },
    locationId: { type: INTEGER, allowNull: false },
    priceId: { type: INTEGER, allowNull: false },
  },
  {
    tableName: "landmarks",
  }
);

const Price = sequelize.define(
  "prices",
  {
    price: { type: FLOAT, allowNull: false },
  },
  {
    tableName: "prices",
  }
);

Location.hasMany(LandMarks);
LandMarks.belongsTo(Location, {
  foreignKey: "locationId",
  as: "locations",
});

Price.hasMany(LandMarks);
LandMarks.belongsTo(Price, {
  foreignKey: "priceId",
  as: "prices",
});










const DeliveryDetails = sequelize.define(
  "deliverydetails",
  {
    drugname: { type: STRING, allowNull: false },
    quantity: { type: INTEGER, allowNull: false },
    price: { type: DECIMAL, allowNull: false },
    price_symbol: { type: STRING, allowNull: false },
    rider_name: { type: STRING, allowNull: false },
    rider_phonenumber: { type: STRING, allowNull: false },
    rider_plate: { type: STRING, allowNull: false },
    cust_deliveryaddress: { type: STRING, allowNull: false },

    // total: { type: DECIMAL, allowNull: false },
  },
  {
    tableName: "deliverydetails",
  }
);







const Prescription = sequelize.define(
  "prescription",
  {
    email: { type: STRING, allowNull: false },
   contact: { type: STRING, allowNull: false },
   image: { type: STRING, allowNull: false },
 
    // total: { type: DECIMAL, allowNull: false },
  },
  {
    tableName: "prescription",
  }
);









// sequelize.sync();

export const models = {
  Location,
  LandMarks,
  Price,
  Categories,
  Riders,
  Users,
  Drugs,
  Orders,
  Carts,
  FeaturedDrugs,
  OrderDetails,
  Delivery,
  DeliveryDetails,
  Prescription,
  sequelize,
};
