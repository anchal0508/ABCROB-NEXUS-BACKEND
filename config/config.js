require('dotenv').config();
require('dotenv').config(); // Yeh aapki .env file ko read karega

const dbConfig = {
  username: process.env.SUPABASE_DB_USER || 'postgres',
  password: process.env.SUPABASE_DB_PASSWORD,
  database: process.env.SUPABASE_DB_NAME || 'postgres',
  host: process.env.SUPABASE_DB_HOST,
  dialect: 'postgres',
  port: process.env.SUPABASE_DB_PORT, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Remote connection block hone se rokne ke liye
    }
  }
};

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig
};
