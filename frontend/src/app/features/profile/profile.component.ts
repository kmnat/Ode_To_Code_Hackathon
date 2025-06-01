import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    username: 'Adventurer',
    gamesPlayed: 15,
    score: 1250,
    avatarUrl: 'assets/anime/samurai.webm' // Example avatar, adjust as needed
  };

  constructor() { }

  calculateRank(score: number): string {
    if (score > 2000) return 'Master Wizard';
    if (score > 1500) return 'Grand Sorcerer';
    if (score > 1000) return 'Adept Mage';
    if (score > 500) return 'Apprentice';
    return 'Novice';
  }
}
