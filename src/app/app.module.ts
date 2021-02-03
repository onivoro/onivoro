import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig} from './firebase-config';
import { FirestoreService } from './firestore.service';
import { AppComponent } from './app.component';
const imports = [
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule,
  BrowserModule
];
@NgModule({
  imports,
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
