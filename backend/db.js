const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/DBconfig.js")[env]; // Asegúrate de que esta línea esté correcta
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

console.log(sequelize);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con éxito a la base de datos.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

testConnection();

console.log(process.env.DB_HOST); // Debería mostrar "autorack.proxy.rlwy.net"
console.log(process.env.DB_USER); // Debería mostrar "root"
