import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './Entity/role.entity';
import { User } from './Entity/user.entity';
import { RolesController } from './controllers/roles.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/UsersService.service';
import { RolesService } from './services/roles-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService],
  exports: [UsersService, RolesService],
})
export class UsersModule {}
