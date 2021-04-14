const environment = String(process.env.NODE_ENV).trim()
console.log(`🍃 Using environment: '${environment}'`);

const devConfig = {
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

const prodConfig = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "application",
  entities: [
    "dist/models/*.js"
  ],
  migrations: [
    "dist/database/migrations/*.js"
  ],
  cli: {
    migrationsDir: "dist/database/migrations",
    entitiesDir: "dist/models",
  }
}

module.exports = environment == 'dev' ? devConfig : prodConfig;
