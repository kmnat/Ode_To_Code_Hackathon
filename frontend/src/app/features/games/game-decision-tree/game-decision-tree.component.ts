import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';
import { TreeVisualizerComponent } from './tree-visualizer/tree-visualizer.component';

export interface TreeNode {
  question: string;
  type: 'question' | 'action';
  yesNode?: TreeNode;
  noNode?: TreeNode;
}

@Component({
  selector: 'app-game-decision-tree',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, TreeVisualizerComponent],
  templateUrl: './game-decision-tree.component.html',
  styleUrl: './game-decision-tree.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class GameDecisionTreeComponent {
  decisionTree: TreeNode = {
    question: 'Do u have a personal trading demat account?',
    type: 'question',
    yesNode: {
      question: 'Is it with a third party broker like Zerodha?',
      type: 'question',
      yesNode: {
        question: 'Do u have shares in that account',
        type: 'question',
        yesNode: {
          question: 'TRANSFER THE SHARES TO CITI APPROVED BROKER OR SELL THEM AND CLOSE THE ACCOUNT',
          type: 'action'
        },
        noNode: {
          question: 'CLOSE THE ACCOUNT',
          type: 'action'
        }
      },
      noNode: {
        question: 'IS IT WITH HDFC OR KOTAK SECURITIES?',
        type: 'question',
        yesNode: {
          question: 'Take preclearance and process ur transaction in t+1 days',
          type: 'action'
        }
      }
    },
    noNode: {
      question: 'U HAVE NOTHING TO DO',
      type: 'action'
    }
  };

  currentNode: TreeNode = this.decisionTree;
  gameHistory: TreeNode[] = [this.currentNode];
  isGameComplete = false;
  visitedChoices = new Map<TreeNode, { yesTraversed?: boolean; noTraversed?: boolean }>();

  wasPreviousChoiceYes(index: number): boolean {
    if (index === 0 || index >= this.gameHistory.length) {
      return false; // No previous choice for the first node or out of bounds
    }
    const previousNode = this.gameHistory[index - 1];
    const currentNode = this.gameHistory[index];
    return previousNode.yesNode === currentNode;
  }

  makeChoice(choice: 'yes' | 'no'): void {
    const currentChoices = this.visitedChoices.get(this.currentNode) || {};
    if (choice === 'yes') {
      currentChoices.yesTraversed = true;
    } else {
      currentChoices.noTraversed = true;
    }
    this.visitedChoices.set(this.currentNode, currentChoices);

    const nextNode = choice === 'yes' ? this.currentNode.yesNode : this.currentNode.noNode;
    
    if (nextNode) {
      this.currentNode = nextNode;
      this.gameHistory.push(this.currentNode);
      
      if (this.currentNode.type === 'action') {
        this.isGameComplete = true;
      }
    }
  }

  restartGame(): void {
    this.currentNode = this.decisionTree;
    this.gameHistory = [this.currentNode];
    this.isGameComplete = false;
    this.visitedChoices.clear();
  }

  goBack(): void {
    if (this.gameHistory.length > 1) {
      this.gameHistory.pop();
      this.currentNode = this.gameHistory[this.gameHistory.length - 1];
      this.isGameComplete = false;
    }
  }

  hasChoiceBeenTraversed(choice: 'yes' | 'no'): boolean {
    const choices = this.visitedChoices.get(this.currentNode);
    if (!choices) {
      return false;
    }
    return choice === 'yes' ? choices.yesTraversed === true : choices.noTraversed === true;
  }
}
