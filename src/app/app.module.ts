import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig} from './firebase-config';
const imports = [
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule,
];
@NgModule({
  imports,
  exports: [
    AngularFireModule,
    AngularFirestoreModule
  ]
})
export class AppModule { }
