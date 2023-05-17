import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, filter, of, Subscription, take, tap } from 'rxjs';
import { PlayerRepository } from '../../repositories/player-repository';
import { IPlayer } from '../../types/player.interface';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { RouteParams } from '../../enums/route-params.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements AfterViewInit, OnDestroy {
  players$ = this.playerRepository.list$();
  cards$ = of([1, 3, 5, 8, 13, 21])
  player!: IPlayer;
  playerId!: string;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerRepository: PlayerRepository,
    private dialog: MatDialog,
  ) {
  }

  async ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.playerId = this.route.snapshot.params[RouteParams.PlayerId];

    this.subscription = of(this.playerId).pipe(
      filter(playerId => !playerId),
      take(1),
      concatMap(() =>
        this.dialog.open(PlayerFormComponent).afterClosed().pipe(tap(player =>
          this.router.navigate([this.route.snapshot.params[RouteParams.RoomId], player.id])
        ))))
      .subscribe();
  }

  async vote (vote: number) {
    await this.playerRepository.patch({vote, id: this.playerId});
  }
}
