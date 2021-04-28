import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.PORT_DB),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations',
  },
} as ConnectionOptions;
