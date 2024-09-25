
const {DataSource} = require('typeorm')
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "odyssey",
  synchronize: false,
  logging: false,
  entities: ["dist/MyProject/src/entity/*.js"],
  migrations: ["dist/migration-lambdda/src/migrations/*.js"],
  cli: {
    entitiesDir: "dist/MyProject/src/entity",
    migrationsDir: "src/migrations"
  },
});



module.exports = {
  AppDataSource,
}