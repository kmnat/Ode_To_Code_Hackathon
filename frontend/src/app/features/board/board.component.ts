import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface LeaderboardPlayer {
  _id: string;
  name: string;
  score1: number;
  score2: number;
  avatarUrl?: string;
  rank?: number;
  totalScore?: number;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, HttpClientModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  leaderboardData: LeaderboardPlayer[] = [];
  displayedColumns: string[] = ['rank', 'avatar', 'username', 'score1', 'score2', 'totalScore'];
  error: string = '';
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchLeaderboard();
  }

  fetchLeaderboard() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No authentication token found';
      this.loading = false;
      return;
    }

    this.http.get<LeaderboardPlayer[]>('http://localhost:5000/api/grads/leaderboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        // Process the data to add rank and total score
        this.leaderboardData = data
          .map(player => ({
            ...player,
            totalScore: (player.score1 || 0) + (player.score2 || 0),
            avatarUrl: player.avatarUrl || 'assets/anime/samurai.webm' // Use stored avatar or default
          }))
          // Sort by total score
          .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
          // Add rank
          .map((player, index) => ({
            ...player,
            rank: index + 1
          }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch leaderboard:', error);
        this.error = 'Failed to load leaderboard data';
        this.loading = false;
      }
    });
  }
}
