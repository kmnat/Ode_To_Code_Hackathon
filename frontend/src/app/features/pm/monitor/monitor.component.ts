import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface GradProgress {
  _id: string;
  name: string;
  score1: number;
  score2: number;
  totalScore: number;
  progress: {
    domino: string;
    decisionTree: string;
    totalScore: number;
    overallProgress: string;
  };
}

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent implements OnInit {
  gradsProgress: GradProgress[] = [];
  displayedColumns: string[] = ['name', 'domino', 'decisionTree', 'totalScore', 'status', 'actions'];
  error: string = '';
  loading: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchGradsProgress();
  }

  fetchGradsProgress() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No authentication token found';
      this.loading = false;
      return;
    }

    this.http.get<GradProgress[]>('http://localhost:5000/api/pm/monitor-grads', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.gradsProgress = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch grads progress:', error);
        this.error = 'Failed to load grads progress data';
        this.loading = false;
      }
    });
  }

  viewGradDetail(gradId: string) {
    this.router.navigate(['/pm/grad', gradId]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return '#4CAF50';
      case 'In Progress':
        return '#2196F3';
      default:
        return '#FFA000';
    }
  }

  getProgressValue(score: number): number {
    // Assuming max score is 100
    return (score / 100) * 100;
  }
} 