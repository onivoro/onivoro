import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { IFormConfig, IDynaFormRx, IFieldConfig } from '@onivoro/angular-serializable-forms';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';

type IData = any;

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
  options$: Observable<IFieldConfig> = this.options$$.asObservable().pipe(filter(c => c !== null));
  data$$: BehaviorSubject<IData> = new BehaviorSubject<IData>(null as any);
  data$: Observable<IData> = this.data$$.asObservable();
  statusChange: EventEmitter<boolean> = new EventEmitter();
  valueChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }
  async ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(tap(posts => this.data$$.next(posts)))
      .subscribe();
  }

  valid = false;
  dirty = false;

  onStatusChange(valid: boolean) {
    this.valid = valid;
    console.warn({ valid });
    this.statusChange.emit(valid);
  }
  onValueChange(data: IData) {
    this.data$$.next(data);
    this.dirty = true;
    console.warn({ data });
    this.valueChange.emit(data);
  }
}
