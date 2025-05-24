import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { GameDecisionTreeComponent } from './features/games/game-decision-tree/game-decision-tree.component';
import { GameDominoComponent } from './features/games/game-domino/game-domino.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'decision-tree', component: GameDecisionTreeComponent },
  { path: 'domino', component: GameDominoComponent },
  { path: '', component: HomeComponent }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 