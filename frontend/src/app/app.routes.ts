import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { GameDominoComponent } from './features/games/game-domino/game-domino.component';
import { GameDecisionTreeComponent } from './features/games/game-decision-tree/game-decision-tree.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'domino', component: GameDominoComponent },
    { path: 'decision-tree', component: GameDecisionTreeComponent }
  ];