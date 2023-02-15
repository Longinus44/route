export const Tconfig = {
  Port: process.env.port1,
  Host: "http://localhost:",
  JWTCODE: String(process.env.JWTKEY),
  Database: {
    DB_Name: String(process.env.MONGONAME),
    DB_Code: String(process.env.DB_PASSWORD),
    DB_URI: String(process.env.DB_CONNECTION),
  },
};
