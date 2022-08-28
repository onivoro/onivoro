import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items$: Observable<any[]>;
  constructor(firestore: Firestore) {
    const c = collection(firestore, 'items');
    this.items$ = collectionData(c);
  }

  ngOnInit(): void {

  }

}
