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
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'decision-tree', component: GameDecisionTreeComponent, canActivate: [authGuard] },
  { path: 'domino', component: GameDominoComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] },
  { path: 'board', component: BoardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'settings', component: HomeComponent, canActivate: [authGuard] },
  { path: 'resources', component: ResourcesComponent, canActivate: [authGuard] },
  {
    path: 'pm',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'pm' },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/pm/monitor/monitor.component').then(m => m.MonitorComponent)
      },
      {
        path: 'grad/:id',
        loadComponent: () => import('./features/pm/grad-detail/grad-detail.component').then(m => m.GradDetailComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 