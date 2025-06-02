import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="nav-toolbar">
      <span class="logo" routerLink="/">🎮 RPG Learning</span>
      
      <div class="nav-links">
        <ng-container *ngIf="authService.isLoggedIn()">
          <a mat-button routerLink="/home" routerLinkActive="active">
            <mat-icon>home</mat-icon>
            Home
          </a>
          <a mat-button routerLink="/board" routerLinkActive="active">
            <mat-icon>leaderboard</mat-icon>
            Leaderboard
          </a>
          <a mat-button routerLink="/resources" routerLinkActive="active">
            <mat-icon>library_books</mat-icon>
            Resources
          </a>
          <a mat-button routerLink="/profile" routerLinkActive="active">
            <mat-icon>person</mat-icon>
            Profile
          </a>
          <button mat-button (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </ng-container>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .nav-toolbar {
      background: rgba(20, 20, 50, 0.95);
      border-bottom: 1px solid #00f0ff33;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
    }

    .logo {
      color: #00f0ff;
      font-family: 'Orbitron', sans-serif;
      font-size: 1.5rem;
      cursor: pointer;
      text-shadow: 0 0 10px #00f0ff55;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;

      a, button {
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Orbitron', sans-serif;
        transition: all 0.3s ease;

        &:hover {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.1);
        }

        &.active {
          color: #00f0ff;
          border-bottom: 2px solid #00f0ff;
        }

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
      }
    }

    @media (max-width: 768px) {
      .nav-toolbar {
        padding: 0 1rem;
      }

      .logo {
        font-size: 1.2rem;
      }

      .nav-links {
        gap: 0.5rem;

        a, button {
          padding: 0 8px;

          span {
            display: none;
          }
        }
      }
    }
  `]
})
export class NavComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
} 