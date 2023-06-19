import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig, ILookup } from '@onivoro/angular-forms';

@Component({
  selector: 'dyna-field',
  styleUrls: ['./field.component.scss'],
  templateUrl: './field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit {
  @Input() label: string;
  @Input() field: string;
  @Input() type: string;
  @Input() multiple: boolean;
  @Input() options?: ILookup<string, any>[];
  @Input() readOnly!: boolean;
  @Input() form!: FormGroup;
  uiOptions: IFieldConfig;

  ngOnInit() {
    this.uiOptions = {
      fieldOptions: {
        [this.field]: {
          label: this.label,
          type: this.type,
          options: this.options,
          multiple: this.multiple
        },
      },
      fieldLayout: [[this.field]],
    };
  }

  trackByOptionValue(_index: number, obj: { value: any }) {
    return obj.value;
  }
}
