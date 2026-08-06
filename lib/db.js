import mysql from "mysql2/promise";

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,     // e.g. "forever-db.c146cccu4ohk.ap-south-1.rds.amazonaws.com"
      user: process.env.MYSQL_USER,     // your DB username
      password: process.env.MYSQL_PASS, // your DB password
      database: process.env.MYSQL_DB,   // e.g. "e-commerce"
      port: 3306                        // default MySQL port
    });

    console.log("✅ MySQL connected successfully");
    return connection;
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
