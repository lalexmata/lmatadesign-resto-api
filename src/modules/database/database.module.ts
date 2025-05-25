import typeOrmConfig from '@database/typeorm.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables del .env
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class DatabaseModule {}
