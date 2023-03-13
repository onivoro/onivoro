import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { IDynaFormRx, IFieldConfig } from '@onivoro/angular-serializable-forms';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';

type IData = {
  title: string;
  body: string;
};

const defaultConfig: IFieldConfig = {
  fieldOptions: {
    title: { label: 'Title', type: 'text' },
    body: { label: 'Body', type: 'textarea' },
  },
  fieldLayout: [
    ['title'],
    ['body'],
  ]
};

@Component({
  selector: 'onivoro-forms',
  templateUrl: './forms.component.html',
})
export class FormsComponent implements OnInit, IDynaFormRx<IData> {
  options$$: BehaviorSubject<IFieldConfig> = new BehaviorSubject(defaultConfig);
  options$: Observable<IFieldConfig> = this.options$$.asObservable();
  data$$: BehaviorSubject<IData> = new BehaviorSubject<IData>(null as any);
  data$: Observable<IData> = this.data$$.asObservable().pipe(
    tap(data => {
      if(data?.body?.startsWith('Other')) {
        this.options$$.next({fieldOptions: {...defaultConfig.fieldOptions, other: {type: 'text', label: 'Other'}}, fieldLayout: [...defaultConfig.fieldLayout, ['other']]})
      }
    })
  );
  statusChange: EventEmitter<boolean> = new EventEmitter();
  valueChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }
  async ngOnInit() {
    this.http.get<IData>('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(tap(posts => this.data$$.next(posts)))
      .subscribe();
  }

  valid = false;
  dirty = false;

  onStatusChange(valid: boolean | null) {
    this.valid = !!valid;
    console.warn({ valid });
    this.statusChange.emit(valid as any);
  }
  onValueChange(data: IData | null) {
    this.data$$.next(data as any);
    this.dirty = true;
    console.warn({ data });
    this.valueChange.emit(data);
  }
}
