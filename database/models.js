import { Sequelize, DataTypes } from "sequelize";
const { STRING, INTEGER, DATE, BOOLEAN, NUMBER, DECIMAL } = DataTypes;

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
  "users",
  {
    first_name: { type: STRING, allowNull: false },
    last_name: { type: STRING, allowNull: false },
    password: { type: STRING, allowNull: false },
    phone_number: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false, validate: { isEmail: true } },
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
    price: { type: DECIMAL, allowNull: false },
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
  "featuredDrugs",
  {
    name: { type: STRING, allowNull: false },
    description: { type: STRING, allowNull: false },
    price: { type: DECIMAL, allowNull: false },
    category: { type: STRING, allowNull: false },
    price_symbol: { type: STRING, allowNull: false },
    image: { type: STRING, allowNull: false },
  },
  {
    tableName: "featuredDrugs",
  }
);

sequelize.sync();

export const models = {
  Categories,
  Riders,
  Users,
  Drugs,
  Orders,
  Carts,
  FeaturedDrugs,
  OrderDetails,
  sequelize,
};
