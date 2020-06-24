import { UserGroupRole } from './user-group-role/user-group-role.entity';
import { QueryService, DeepPartial } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserGroup } from './user-group.entity';

@QueryService(UserGroup)
export class UserGroupQueryService extends TypeOrmQueryService<UserGroup> {
  constructor(@InjectRepository(UserGroup) repo: Repository<UserGroup>) {
    super(repo);
  }

  public async createOne(record: DeepPartial<UserGroup>): Promise<UserGroup> {
    await this.ensureEntityDoesNotExist(record);
    return this.repo.manager.transaction(
      async (manager): Promise<UserGroup> => {
        const entity = await manager.getRepository(UserGroup).save(record);
        await this.insertRelations(manager, record as UserGroup);
        return entity;
      }
    );
  }

  public async updateOne(
    id: string,
    update: DeepPartial<UserGroup>
  ): Promise<UserGroup> {
    this.ensureIdIsNotPresent(update);
    const entity = await this.repo.findOneOrFail(id);
    const updatedEntity = this.repo.merge(entity, update);
    if (this.relationsUpdated(update)) {
      entity.updatedAt = new Date();
    }
    return this.repo.manager.transaction(
      async (manager): Promise<UserGroup> => {
        await this.updateRelations(manager, updatedEntity);
        return manager.save(UserGroup, updatedEntity);
      }
    );
  }

  private relationsUpdated(update: DeepPartial<UserGroup>): boolean {
    return Boolean(update.userGroupRoles);
  }

  private async updateRelations(manager: EntityManager, entity: UserGroup) {
    await this.clearRelations(manager, entity);
    await this.insertRelations(manager, entity);
  }

  private async clearRelations(
    manager: EntityManager,
    entity: UserGroup
  ): Promise<void> {
    if (entity.userGroupRoles) {
      await manager.delete(UserGroupRole, {
        userGroupId: entity.id,
      });
    }
  }

  private async insertRelations(
    manager: EntityManager,
    entity: UserGroup
  ): Promise<void> {
    await manager.insert(
      UserGroupRole,
      UserGroupRole.fromRoleInput(entity.userGroupRoles, entity.id)
    );
  }
}
