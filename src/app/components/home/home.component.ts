import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  request () {
    this.dialog.open(ContactFormComponent).afterClosed().toPromise()
  }

}
