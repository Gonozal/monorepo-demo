import { ScenarioCategoryUserPermission } from './permissions/user/scenario-category-user-permission.entity';
import { ScenarioCategoryUserGroupPermission } from './permissions/user-group/scenario-category-user-group-permission.entity';
import { QueryService, DeepPartial } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { ScenarioCategory } from './scenario-category.entity';

@QueryService(ScenarioCategory)
export class ScenarioCategoryQueryService extends TypeOrmQueryService<
  ScenarioCategory
> {
  constructor(
    @InjectRepository(ScenarioCategory) repo: Repository<ScenarioCategory>
  ) {
    super(repo);
  }

  public async createOne(
    record: DeepPartial<ScenarioCategory>
  ): Promise<ScenarioCategory> {
    await this.ensureEntityDoesNotExist(record);
    return this.repo.manager.transaction(
      async (manager): Promise<ScenarioCategory> => {
        const entity = await manager
          .getRepository(ScenarioCategory)
          .save(record);
        await this.insertRelations(manager, record as ScenarioCategory);
        return entity;
      }
    );
  }

  public async updateOne(
    id: string,
    update: DeepPartial<ScenarioCategory>
  ): Promise<ScenarioCategory> {
    this.ensureIdIsNotPresent(update);
    const entity = await this.repo.findOneOrFail(id);
    const updatedEntity = this.repo.merge(entity, update);
    if (this.relationsUpdated(update)) {
      entity.updatedAt = new Date();
    }
    return this.repo.manager.transaction(
      async (manager): Promise<ScenarioCategory> => {
        await this.updateRelations(manager, updatedEntity);
        return manager.save(ScenarioCategory, updatedEntity);
      }
    );
  }

  private relationsUpdated(update: DeepPartial<ScenarioCategory>): boolean {
    return Boolean(update.userPermissions || update.userGroupPermissions);
  }

  private async updateRelations(
    manager: EntityManager,
    entity: ScenarioCategory
  ) {
    await this.clearRelations(manager, entity);
    await this.insertRelations(manager, entity);
  }

  private async clearRelations(
    manager: EntityManager,
    entity: ScenarioCategory
  ): Promise<void> {
    if (entity.userGroupPermissions) {
      await manager.delete(ScenarioCategoryUserGroupPermission, {
        scenarioCategoryId: entity.id,
      });
    }
    if (entity.userPermissions) {
      await manager.delete(ScenarioCategoryUserPermission, {
        scenarioCategoryId: entity.id,
      });
    }
  }

  private async insertRelations(
    manager: EntityManager,
    entity: ScenarioCategory
  ): Promise<void> {
    await manager.insert(
      ScenarioCategoryUserGroupPermission,
      ScenarioCategoryUserGroupPermission.fromInput(
        entity.userGroupPermissions,
        entity.id
      )
    );
    await manager.insert(
      ScenarioCategoryUserPermission,
      ScenarioCategoryUserPermission.fromInput(
        entity.userPermissions,
        entity.id
      )
    );
  }
}
