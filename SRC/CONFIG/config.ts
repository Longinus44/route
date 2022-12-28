export const config = {
  port: process.env.PORT,
  host: "http://localhost:",
  secretkey: String(process.env.JWTKEY),
  Name: String(process.env.MONGONAME),
  dataBase: {
    Name: String(process.env.DB_NAME),
    Password: String(process.env.DB_PASSWORD),
    string: process.env.DB_CONNECTION,
  },
};
