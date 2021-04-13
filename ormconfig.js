module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "application",
  entities: [
    "src/models/*.ts"
  ],
  migrations: [
    "src/database/migrations/*.ts"
  ],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/models",
  }
}
