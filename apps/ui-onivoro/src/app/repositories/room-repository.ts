import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { Collections } from "../enums/collections.enum";
import { IRoom } from "../types/room.interface";
import { AbstractRepository } from "./abstract-repository";

@Injectable({providedIn: 'root'})
export class RoomRepository extends AbstractRepository<IRoom> {
    collectionName: string = Collections.Rooms;
    constructor(public firestore: Firestore) {
        super();
    }
}
