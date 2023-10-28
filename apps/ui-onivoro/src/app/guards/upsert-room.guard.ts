import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { RouteParams } from '../enums/route-params.enum';
import { RoomRepository } from '../repositories/room-repository';

@Injectable({
  providedIn: 'root'
})
export class UpsertRoomGuard  {
  constructor(private roomRepository: RoomRepository) { }

  canActivate(
    route: ActivatedRouteSnapshot) {
    const roomName = route.params[RouteParams.RoomId];
    return of(this.roomRepository.patch({ name: roomName, id: roomName })).pipe(map(() => true));
  }
}
