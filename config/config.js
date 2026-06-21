const dbConfig = {
  username: 'postgres.irvjebwkrfcctmoimvcz', 
  password: 'Aapka_Real_Password',           
  database: 'postgres',
  host: 'aws-1-ap-southeast-1.pooler.supabase.com', // Yahan bhi aws-1 kar dein
  dialect: 'postgres',
  port: 5432, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
};

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig
};
