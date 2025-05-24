import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-decision-tree',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './game-decision-tree.component.html',
  styleUrl: './game-decision-tree.component.scss'
})
export class GameDecisionTreeComponent {
  // Add game logic here
}
