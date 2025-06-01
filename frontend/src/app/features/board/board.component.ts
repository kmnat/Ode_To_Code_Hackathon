import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface LeaderboardPlayer {
  rank: number;
  username: string;
  score: number;
  avatarUrl: string;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  leaderboardData: LeaderboardPlayer[] = [
    { rank: 1, username: 'WizardKing', score: 2500, avatarUrl: 'assets/avatars/mage.png' },
    { rank: 2, username: 'ShadowSlayer', score: 2350, avatarUrl: 'assets/avatars/rogue.png' },
    { rank: 3, username: 'DragonHeart', score: 2200, avatarUrl: 'assets/avatars/paladin.png' },
    { rank: 4, username: 'StarGazer', score: 2100, avatarUrl: 'assets/avatars/archer.png' },
    { rank: 5, username: 'RuneMaster', score: 1950, avatarUrl: 'assets/avatars/healer.png' },
    { rank: 6, username: 'TheSilentOne', score: 1800, avatarUrl: 'assets/avatars/assassin.png' },
    { rank: 7, username: 'StoneShield', score: 1650, avatarUrl: 'assets/avatars/necromancer.png' },
    { rank: 8, username: 'SwiftArrow', score: 1500, avatarUrl: 'assets/avatars/bard.png' },
    { rank: 9, username: 'Adventurer', score: 1250, avatarUrl: 'assets/anime/samurai.webm' }, // Current user from profile example
    { rank: 10, username: 'NewChallenger', score: 1100, avatarUrl: 'assets/avatars/druid.png' },
  ];

  displayedColumns: string[] = ['rank', 'avatar', 'username', 'score'];

  constructor() { }
}
