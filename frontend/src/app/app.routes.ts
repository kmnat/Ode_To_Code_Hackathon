import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { GameDominoComponent } from './features/games/game-domino/game-domino.component';
import { GameDecisionTreeComponent } from './features/games/game-decision-tree/game-decision-tree.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'domino', component: GameDominoComponent, canActivate: [authGuard] },
    { path: 'decision-tree', component: GameDecisionTreeComponent, canActivate: [authGuard]},
    { path: 'dashboard', component: HomeComponent, canActivate: [authGuard]},
  ];