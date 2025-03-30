import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Falta la variable de entorno: ${name}`);
  }
  return value;
}

// Configuración de TypeORM sin valores opcionales
const typeOrmConfig: DataSourceOptions = {
  type: 'mysql', // 👈 Aquí aseguramos que siempre sea "postgres"
  host: getEnvVariable('DB_HOST'),
  port: parseInt(getEnvVariable('DB_PORT')),
  username: getEnvVariable('DB_USER'),
  password: getEnvVariable('DB_PASSWORD'),
  database: getEnvVariable('DB_NAME'),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: true,
  //autoLoadEntities: true,
  logging: true,
};

export default typeOrmConfig;

// ✅ Crear DataSource sin spread (...) para evitar problemas de tipos
export const AppDataSource = new DataSource(typeOrmConfig);
