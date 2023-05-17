import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { RouteParams } from './enums/route-params.enum';
import { UpsertPlayerGuard } from './guards/upsert-player.guard';
import { UpsertRoomGuard } from './guards/upsert-room.guard';
const param = (segment: RouteParams) => `:${segment}`;
const routes: Routes = [
  {
    component: RoomComponent,
    path: `${param(RouteParams.RoomId)}/${param(RouteParams.PlayerId)}`,
    pathMatch: 'full',
    canActivate: [UpsertPlayerGuard]
  },
  {
    component: RoomComponent,
    path: `${param(RouteParams.RoomId)}`,
    pathMatch: 'full',
    canActivate: [UpsertRoomGuard]
  },
  {
    component: HomeComponent,
    path: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
