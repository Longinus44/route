export const indexconfig = {
  port: Number(process.env.PORT) || 6000,
  database: {
    name: String(process.env.DB_NAME),
    password: String(process.env.DB_PASSWORD),
  },
  database2: {
    connect: String(process.env.DB_CONNECTION),
    name: String(process.env.MONGONAME),
    password: String(process.env.MONGO_PW),
  },
};
