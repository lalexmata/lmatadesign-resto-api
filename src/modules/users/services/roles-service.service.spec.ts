import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles-service.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../Entity/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from '../Dto/RoleDto';

describe('RolesService', () => {
  let service: RolesService;
  let repository: Repository<Role>;

  const mockRole = {
    id: 1,
    name: 'admin',
  };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles = [mockRole];
      mockRepository.find.mockResolvedValue(roles);

      const result = await service.findAll();
      expect(result).toEqual(roles);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const role = [mockRole];
      mockRepository.find.mockResolvedValue(role);

      const result = await service.findOne(1);
      expect(result).toEqual(role);
      expect(mockRepository.find).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const createRoleDto: CreateRoleDto = {
        name: 'admin',
      };

      mockRepository.create.mockReturnValue(mockRole);
      mockRepository.save.mockResolvedValue(mockRole);

      const result = await service.create(createRoleDto);
      expect(result).toEqual(mockRole);
      expect(mockRepository.create).toHaveBeenCalledWith(createRoleDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const updateRoleDto: UpdateRoleDto = {
        name: 'updated-admin',
      };

      mockRepository.findOne.mockResolvedValue({ ...mockRole, ...updateRoleDto });

      const result = await service.update(1, updateRoleDto);
      expect(result).toEqual({ ...mockRole, ...updateRoleDto });
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateRoleDto);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({ affected: 1 });
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
