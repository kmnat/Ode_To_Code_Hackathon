import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface UserProfile {
  _id: string;
  name: string;
  role: string;
  score1: number;  // Domino game score
  score2: number;  // Tree game score
  gamesPlayed: number;
  avatarUrl: string;
  rank?: number;    // Optional rank in leaderboard
  totalScore?: number;
}

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
  iat: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    _id: '',
    name: 'Loading...',
    role: '',
    score1: 0,
    score2: 0,
    gamesPlayed: 0,
    avatarUrl: 'assets/anime/samurai.webm'
  };

  loading = true;
  error = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUserProfile();
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No authentication token found';
      this.loading = false;
      return;
    }

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      this.error = 'Invalid token format';
      this.loading = false;
      return;
    }

    this.http.get<UserProfile>(`http://localhost:5000/api/grads/${decodedToken.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.user = {
          ...data,
          role: decodedToken.role,
          avatarUrl: data.avatarUrl || 'assets/anime/samurai.webm',
          totalScore: (data.score1 || 0) + (data.score2 || 0)
        };
        // Fetch user's rank from leaderboard
        this.fetchUserRank();
      },
      error: (error) => {
        console.error('Failed to fetch profile:', error);
        this.error = 'Failed to load profile data';
        this.loading = false;
      }
    });
  }

  fetchUserRank() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get<any[]>('http://localhost:5000/api/grads/leaderboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        // Sort users by total score
        const sortedUsers = data
          .map(user => ({
            ...user,
            totalScore: (user.score1 || 0) + (user.score2 || 0)
          }))
          .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));

        // Find user's rank
        const userIndex = sortedUsers.findIndex(u => u._id === this.user._id);
        if (userIndex !== -1) {
          this.user.rank = userIndex + 1;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch rank:', error);
        this.loading = false;
      }
    });
  }

  calculateRank(score: number): string {
    if (score > 2000) return 'Master Wizard';
    if (score > 1500) return 'Grand Sorcerer';
    if (score > 1000) return 'Adept Mage';
    if (score > 500) return 'Apprentice';
    return 'Novice';
  }

  get totalScore(): number {
    return (this.user.score1 || 0) + (this.user.score2 || 0);
  }
}
