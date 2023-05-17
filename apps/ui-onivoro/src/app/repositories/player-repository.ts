import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { Collections } from "../enums/collections.enum";
import { IPlayer } from "../types/player.interface";
import { AbstractRepository } from "./abstract-repository";

@Injectable({providedIn: 'root'})
export class PlayerRepository extends AbstractRepository<IPlayer> {
    collectionName: string = Collections.Players;
    constructor(public firestore: Firestore) {
        super();
    }
}
