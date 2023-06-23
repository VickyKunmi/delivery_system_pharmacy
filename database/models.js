import { Sequelize, DataTypes } from "sequelize";
const { STRING, INTEGER, DATE, BOOLEAN, NUMBER, DECIMAL, FLOAT } = DataTypes;

const sequelize = new Sequelize("get_pills_pharmacy", "root", "", {
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
    address: { type: STRING, allowNull: false },
    orderdetails: {type: STRING, allowNull: false},
    totalfee: {type: FLOAT, allowNull: false},
    deliveryfee: {type: FLOAT, allowNull: false},
    drugfee: {type: FLOAT, allowNull: false},

  },
  {
    tableName: "deliveries",
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

sequelize.sync();

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
  sequelize,
};
