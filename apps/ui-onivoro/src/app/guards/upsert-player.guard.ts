import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { RouteParams } from '../enums/route-params.enum';
import { PlayerRepository } from '../repositories/player-repository';

@Injectable({
  providedIn: 'root'
})
export class UpsertPlayerGuard implements CanActivate {
  constructor(private playerRepository: PlayerRepository) { }

  canActivate(
    route: ActivatedRouteSnapshot) {
    const playerName = route.params[RouteParams.PlayerId];
    const room = route.params[RouteParams.RoomId];
    return of(this.playerRepository.patch({ name: playerName, id: playerName, room })).pipe(map(() => true));
  }
}
