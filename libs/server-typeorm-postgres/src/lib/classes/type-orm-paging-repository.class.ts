import {
  EntityManager,
} from 'typeorm';

import { TypeOrmRepository } from './type-orm-repository.class';
import { IPagedData } from '../types/paged-data.interface';
import { getSkip } from '../functions/get-skip.function';
import { removeFalseyKeys } from '../functions/remove-falsey-keys.function';
import { getPagingKey } from '../functions/get-paging-key.function';
import { IPageParams } from '../types/page-params.interface';

export abstract class TypeOrmPagingRepository<TEntity> extends TypeOrmRepository<TEntity> {
  protected getPagingKey = getPagingKey;
  protected getSkip = getSkip;
  protected removeFalseyKeys = removeFalseyKeys;

  constructor(entityType: any, entityManager: EntityManager) {
    super(entityType, entityManager);
  }

  abstract getPage<TParams>(pageParams: IPageParams, params: TParams): Promise<IPagedData<TEntity>>;
}
