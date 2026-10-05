import { Client } from "pg";

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "prisma",
  port: 51214,
});

client
  .connect()
  .then(() => {
    console.log("connected to db");
    return client.query("SELECT * FROM users");
  })
  .then((results) => {
    console.log("query results:", results.rows);
  })
  .catch((error) => {
    console.error("error executing query:", error);
  })
  .finally(() => {
    client.end();
  });
