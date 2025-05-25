import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Falta la variable de entorno: ${name}`);
  }
  return value;
}

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: getEnvVariable('DB_HOST'),
  port: parseInt(getEnvVariable('DB_PORT')),
  username: getEnvVariable('DB_USER'),
  password: getEnvVariable('DB_PASSWORD'),
  database: getEnvVariable('DB_NAME'),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: true,
  logging: true,
};

export default typeOrmConfig;

export const AppDataSource = new DataSource(typeOrmConfig as DataSourceOptions);
