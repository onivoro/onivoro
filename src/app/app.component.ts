import { Component } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'things';
  constructor(private readonly firestoreService: FirestoreService) {}
  things$ = this.firestoreService.db.collection(this.title).valueChanges();
}
