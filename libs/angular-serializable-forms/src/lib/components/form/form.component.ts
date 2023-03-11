import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forEach } from '../../constants/for-each.constant';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { IValidatorConfig } from '../../interfaces/validator-config.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IFieldOption } from '../../interfaces/field-option.interface';

@Component({
  selector: 'asf-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent<TData> implements OnDestroy, OnInit {
  @Input() data!: TData;
  @Input() uiOptions!: IFieldConfig | null;
  @Input() readOnly!: boolean;
  @Output() readonly statusChange = new EventEmitter<boolean>();
  @Output() readonly valueChange = new EventEmitter<TData>();
  private readonly destroyed$ = new Subject();
  form!: FormGroup;
  values$!: Observable<TData>;
  status$!: Observable<boolean>;
  errors$!: Observable<any>;

  trackByOptionValue(_index: number, obj: { value: any }) {
    return obj.value;
  }

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildForm();

    this.values$ = this.form.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(500),
        tap((vc: any) => this.valueChange.emit(vc)),
        shareReplay(),
      );

    this.status$ = this.form.statusChanges
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(500),
        map((status) => status === 'VALID'),
        distinctUntilChanged(),
        tap((status) => this.statusChange.emit(status)),
        shareReplay()
      );

    this.values$.subscribe();
    this.status$.subscribe();
  }

  private buildForm() {
    return this.formBuilder.group(this.transformConfigToFormBuilderOptions());
  }

  private transformConfigToFormBuilderOptions(): AbstractControlOptions {
    const formGroupOptions: AbstractControlOptions = {};

    forEach(this.uiOptions?.fieldOptions, (fieldOption: IFieldOption, fieldName: string) => {
      const validators = fieldOption.validators; // ? this.mapValidators(fieldOption.validators) : [];
      (formGroupOptions as any)[fieldName] = [(this.data || ({} as any))[fieldName], validators];
    });

    return formGroupOptions;
  }

  private mapValidators(validators: IValidatorConfig[]) {
    return validators.map((validatorConfig) => {
      const { name, args } = validatorConfig;

      let validator: any = (Validators as any)[name];

      if (args) {
        if (name === 'pattern') {
          validator = validator.apply(validator, [new RegExp(args[0], 'i')]);
        } else {
          validator = validator.apply(validator, args);
        }
      }

      return validator;
    });
  }

  touch(fieldName: string) {
    this.form.get(fieldName)?.markAsTouched();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
