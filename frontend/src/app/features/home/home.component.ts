import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  treeImagePath = 'assets/images/tree.png';
  dominoImagePath = 'assets/images/domino.png';

  constructor(private router: Router) {}

  startCastleQuest() {
    this.router.navigate(['/game/decision-tree']);
  }

  startForestQuest() {
    this.router.navigate(['/game/domino']);
  }
}
