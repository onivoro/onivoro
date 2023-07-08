import {
  EntityManager,
} from 'typeorm';

import { TypeOrmRepository } from './type-orm-repository.class';
import { IPagedData } from '../types/paged-data.interface';
import { getSkip } from '../functions/get-skip.function';
import { removeFalseyKeys } from '../functions/remove-falsey-keys.function';
import { getPagingKey } from '../functions/get-paging-key.function';

export abstract class TypeOrmPagingRepository<TEntity> extends TypeOrmRepository<TEntity> {
  protected getPagingKey = getPagingKey;
  protected getSkip = getSkip;
  protected removeFalseyKeys = removeFalseyKeys;

  constructor(entityType: any, entityManager: EntityManager) {
    super(entityType, entityManager);
  }

  abstract getPage(): Promise<IPagedData<TEntity>>;
}
