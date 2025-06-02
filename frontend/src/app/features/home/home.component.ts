import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';

interface ChatMessage {
  id?: string; // Optional ID for messages
  text: string;
  sender: 'user' | 'bot';
  requiresFeedback?: boolean; // For bot messages needing feedback
  feedback?: 'satisfied' | 'not_satisfied'; // To store user feedback
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
    MatFormFieldModule,
    RouterModule
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
      id: 'initial-bot-message',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      requiresFeedback: false // Initial greeting doesn't require feedback
    }
  ];
  feedbackPending = false; // Flag to track if feedback is awaited

  constructor(private router: Router) {}

  startCastleQuest() {
    this.router.navigate(['/decision-tree'], { skipLocationChange: false });
  }

  startForestQuest() {
    this.router.navigate(['/domino'], { skipLocationChange: false });
  }

  // Chat bot methods
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.feedbackPending) return; // Don't send if feedback is pending

    this.messages.push({
      id: `user-${Date.now()}`,
      text: this.newMessage,
      sender: 'user'
    });
    this.newMessage = '';

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessageId = `bot-${Date.now()}`;
      this.messages.push({
        id: botMessageId,
        text: 'This is a sample bot response. Are you satisfied?',
        sender: 'bot',
        requiresFeedback: true
      });
      this.feedbackPending = true; // Set feedback as pending
    }, 1000);
  }

  handleFeedback(messageId: string, satisfaction: 'satisfied' | 'not_satisfied') {
    const messageIndex = this.messages.findIndex(m => m.id === messageId);
    if (messageIndex > -1) {
      this.messages[messageIndex].feedback = satisfaction;
      this.messages[messageIndex].requiresFeedback = false;
      this.feedbackPending = false;

      // Optional: Add a follow-up message from the bot based on feedback
      let followUpText = '';
      if (satisfaction === 'satisfied') {
        followUpText = 'Great! Happy to help.';
      } else {
        followUpText = 'I understand. I will try to improve.';
      }
      this.messages.push({
        id: `bot-followup-${Date.now()}`,
        text: followUpText,
        sender: 'bot',
        requiresFeedback: false
      });
    }
  }
}
