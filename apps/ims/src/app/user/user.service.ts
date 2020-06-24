import { UserRole } from './user-role/user-role.entity';
import { QueryService, DeepPartial } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from './user.entity';

@QueryService(User)
export class UserQueryService extends TypeOrmQueryService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  public async createOne(record: DeepPartial<User>): Promise<User> {
    await this.ensureEntityDoesNotExist(record);
    return this.repo.manager.transaction(
      async (manager): Promise<User> => {
        const entity = await manager.getRepository(User).save(record);
        await this.insertRelations(manager, record as User);
        return entity;
      }
    );
  }

  public async updateOne(id: string, update: DeepPartial<User>): Promise<User> {
    this.ensureIdIsNotPresent(update);
    const entity = await this.repo.findOneOrFail(id);
    const updatedEntity = this.repo.merge(entity, update);
    if (this.relationsUpdated(update)) {
      entity.updatedAt = new Date();
    }
    await this.repo.manager.transaction(
      async (manager): Promise<void> => {
        await this.updateRelations(manager, updatedEntity);
        await manager.save(User, updatedEntity);
      }
    );
    return this.repo.findOneOrFail(id);
  }

  private relationsUpdated(update: DeepPartial<User>): boolean {
    return Boolean(update.disabledRoles);
  }

  private async updateRelations(manager: EntityManager, entity: User) {
    await this.clearRelations(manager, entity);
    await this.insertRelations(manager, entity);
  }

  private async clearRelations(
    manager: EntityManager,
    entity: User
  ): Promise<void> {
    if (entity.disabledRoles) {
      await manager.delete(UserRole, {
        userId: entity.id,
      });
    }
  }

  private async insertRelations(
    manager: EntityManager,
    entity: User
  ): Promise<void> {
    await manager.insert(
      UserRole,
      UserRole.fromRoleInput(entity.disabledRoles, entity.id)
    );
  }
}
