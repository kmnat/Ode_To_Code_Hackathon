import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { GameDecisionTreeComponent } from './features/games/game-decision-tree/game-decision-tree.component';
import { GameDominoComponent } from './features/games/game-domino/game-domino.component';
import { ProfileComponent } from './features/profile/profile.component';
import { BoardComponent } from './features/board/board.component';
import { ResourcesComponent } from './features/resources/resources.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'decision-tree', component: GameDecisionTreeComponent, canActivate: [authGuard] },
  { path: 'domino', component: GameDominoComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] },
  { path: 'board', component: HomeComponent, canActivate: [authGuard] },
  { path: 'profile', component: HomeComponent, canActivate: [authGuard] },
  { path: 'settings', component: HomeComponent, canActivate: [authGuard] },
  { path: 'resources', component: ResourcesComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 