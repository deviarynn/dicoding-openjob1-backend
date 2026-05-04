require('dotenv').config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL ||
    `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  dir: 'migrations',
  direction: 'up',
  migrationsTable: 'pgmigrations',
};
