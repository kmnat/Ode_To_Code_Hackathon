import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  treeImagePath = 'assets/images/tree.png';
  dominoImagePath = 'assets/images/domino.png';
  
  // Chat bot properties
  isChatOpen = false;
  newMessage = '';
  messages: ChatMessage[] = [
    {
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot'
    }
  ];

  constructor(private router: Router) {}

  startCastleQuest() {
    this.router.navigate(['/game/decision-tree']);
  }

  startForestQuest() {
    this.router.navigate(['/game/domino']);
  }

  // Chat bot methods
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message
    this.messages.push({
      text: this.newMessage,
      sender: 'user'
    });

    // Simulate bot response
    setTimeout(() => {
      this.messages.push({
        text: 'I\'m here to help! However, I\'m currently in development. Please check back later for full functionality.',
        sender: 'bot'
      });
    }, 1000);

    this.newMessage = '';
  }
}
