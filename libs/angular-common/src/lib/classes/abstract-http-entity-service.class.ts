import { BehaviorSubject } from 'rxjs';

export abstract class AbstractHttpEntityService<TEntity> {
    data$$ = new BehaviorSubject<TEntity[]>([]);
    data$ = this.data$$.asObservable();

    abstract _index(): Promise<TEntity[]>;
    abstract _get(id: string): Promise<TEntity>;
    abstract _post(value: TEntity): Promise<void>;
    abstract _put(id: string, value: TEntity): Promise<void>;
    abstract _delete(id: string): Promise<void>;

    async index(): Promise<TEntity[]> {
        return await this.load();
    }

    async get(id: string) {
        return await this._get(id);
    }

    async post(value: TEntity) {
        await this._post(value);

        return await this.reload();
    }

    async put(id: string, value: TEntity) {
        await this._put(id, value);

        return await this.reload();
    }

    async delete(id: string) {
        await this._delete(id);

        return await this.reload();
    }

    async load(): Promise<TEntity[]> {
        if (!this.data$$.value?.length) {
            await this.reload();
        }

        return this.data$$.value;
    }

    async reload(): Promise<TEntity[]> {
        this.data$$.next(await this._index());

        return this.data$$.value;
    }
}
