import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface GradDetail {
  _id: string;
  name: string;
  domino: {
    status: string;
    score: number;
  };
  decisionTree: {
    status: string;
    score: number;
  };
  totalScore: number;
  overallProgress: string;
}

@Component({
  selector: 'app-grad-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  templateUrl: './grad-detail.component.html',
  styleUrl: './grad-detail.component.scss'
})
export class GradDetailComponent implements OnInit {
  gradDetail: GradDetail | null = null;
  error: string = '';
  loading: boolean = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const gradId = this.route.snapshot.paramMap.get('id');
    if (gradId) {
      this.fetchGradDetail(gradId);
    } else {
      this.error = 'No grad ID provided';
      this.loading = false;
    }
  }

  fetchGradDetail(gradId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No authentication token found';
      this.loading = false;
      return;
    }

    this.http.get<GradDetail>(`http://localhost:5000/api/pm/grad-detail/${gradId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => {
        this.gradDetail = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch grad detail:', error);
        this.error = 'Failed to load grad details';
        this.loading = false;
      }
    });
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