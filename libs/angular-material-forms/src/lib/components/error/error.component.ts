import { Component, Input } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'onivoro-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() name: string;
  @Input() form: FormGroup;
}
