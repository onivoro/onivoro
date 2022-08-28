import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collections } from 'src/app/enums/collections.enum';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private firestore: Firestore, private formBuilder: FormBuilder,
    private dialog: MatDialogRef<any>,
    private snackbar: MatSnackBar
    ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  async submit() {
    const c = collection(this.firestore, Collections.Contacts);
    await addDoc(c, this.form.value);
    this.dialog.close();
    this.snackbar.open(`We'll contact you via "${this.form.value.email}". Thank you!`)
  }
}
