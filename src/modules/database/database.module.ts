import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeOrmConfig from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables del .env
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class DatabaseModule {}
