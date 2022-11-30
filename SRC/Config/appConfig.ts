export const appConfig = {
  port: Number(process.env.PORT) || 5100,
  host: String(process.env.HOST),
  database: {
    name: String(process.env.DB_NAME),
    password: String(process.env.DB_PASSWORD),
  },
};
