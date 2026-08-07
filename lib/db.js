import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.MYSQL_DB,      // e.g. "e_commerce"
  process.env.MYSQL_USER,    // DB username
  process.env.MYSQL_PASS,    // DB password
  {
    host: process.env.MYSQL_HOST, // e.g. "forever-db.c146cccu4ohk.ap-south-1.rds.amazonaws.com"
    dialect: "mysql",
    port: 3306,
    logging: false,           // disable SQL logs
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully via Sequelize");
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
