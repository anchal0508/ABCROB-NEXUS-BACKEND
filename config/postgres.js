const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.SUPABASE_DB_HOST,
    username: process.env.SUPABASE_DB_USER,
    password: process.env.SUPABASE_DB_PASSWORD,
    database: process.env.SUPABASE_DB_NAME || 'postgres',
    port: parseInt(process.env.SUPABASE_DB_PORT) || 5432, // Ab yeh .env se 5432 uthayega
    logging: console.log, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
