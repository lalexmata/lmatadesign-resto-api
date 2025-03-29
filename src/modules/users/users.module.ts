import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/UsersService.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { RolesController } from './controllers/roles.controller';
import { RolesServiceService } from './services/roles-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesServiceService],
  exports: [UsersService]
})
export class UsersModule {}
