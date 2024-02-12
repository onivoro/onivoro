import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { IPagedData } from './abstract-paged-entity-service.class';

export abstract class AbstractHttpPagedEntityService<TEntity> {
    page$$ = new BehaviorSubject<number>(0);
    page$ = this.page$$.asObservable();
    pageSize$$ = new BehaviorSubject<number>(2);
    pageSize$ = this.pageSize$$.asObservable().pipe(shareReplay());
    term$$ = new BehaviorSubject<string>('');
    term$ = this.term$$.asObservable().pipe(shareReplay());
    total$$ = new BehaviorSubject<number>(0);
    total$ = this.total$$.asObservable().pipe(shareReplay());
    data$$ = new BehaviorSubject<TEntity[]>([]);
    data$ = this.data$$.asObservable().pipe(shareReplay());
    count$ = this.data$.pipe(map(data => data?.length || 0));
    some$ = this.count$.pipe(map(count => count > 0));
    none$ = this.some$.pipe(map(present => !present));
    loading$$ = new BehaviorSubject<boolean>(false);
    loading$ = this.loading$$.asObservable().pipe(shareReplay());
    notLoading$ = this.loading$.pipe(map(loading => !loading));

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
       await this.reloadCurrentPage();

       return this.data$$.value;
    }

    protected abstract loadPageData(): Promise<IPagedData<TEntity>>;

    async reloadCurrentPage() {
        await this.loadPage(this.page$$.value || 0);
    }

    async loadPage(page: number) {
        if (!this.data$$.value?.length) {
            this.loading$$.next(true);
        }

        const { data, total } = await this.loadPageData();

        this.page$$.next(page);
        this.data$$.next(data);
        this.total$$.next(total);
        this.loading$$.next(false);
    }
}
