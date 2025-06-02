import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'ppt';
  description: string;
  url: string;
  unlocked: boolean;
  requiredPoints: number;
  category: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  currentPoints = 0;
  selectedCategory: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  categories: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];

  resources: Resource[] = [
    // Beginner Level Resources
    {
      id: 1,
      title: 'Introduction to Angular',
      type: 'pdf',
      description: 'Learn the basics of Angular framework, components, and TypeScript fundamentals',
      url: '/assets/resources/intro-to-angular.pdf',
      unlocked: true,
      requiredPoints: 0,
      category: 'beginner',
      icon: 'school'
    },
    {
      id: 2,
      title: 'HTML & CSS Fundamentals',
      type: 'pdf',
      description: 'Master the building blocks of web development with HTML5 and CSS3',
      url: '/assets/resources/html-css-basics.pdf',
      unlocked: true,
      requiredPoints: 0,
      category: 'beginner',
      icon: 'code'
    },
    {
      id: 3,
      title: 'JavaScript Essentials',
      type: 'ppt',
      description: 'Core concepts of JavaScript including variables, functions, and DOM manipulation',
      url: '/assets/resources/js-essentials.pptx',
      unlocked: true,
      requiredPoints: 0,
      category: 'beginner',
      icon: 'javascript'
    },

    // Intermediate Level Resources
    {
      id: 4,
      title: 'Angular Services & DI',
      type: 'pdf',
      description: 'Deep dive into Angular Services, Dependency Injection, and HTTP Client',
      url: '/assets/resources/angular-services.pdf',
      unlocked: false,
      requiredPoints: 20,
      category: 'intermediate',
      icon: 'architecture'
    },
    {
      id: 5,
      title: 'State Management',
      type: 'ppt',
      description: 'Understanding state management in Angular applications using Services and RxJS',
      url: '/assets/resources/state-management.pptx',
      unlocked: false,
      requiredPoints: 30,
      category: 'intermediate',
      icon: 'account_tree'
    },
    {
      id: 6,
      title: 'Angular Forms & Validation',
      type: 'pdf',
      description: 'Master both Template-driven and Reactive forms with custom validation',
      url: '/assets/resources/angular-forms.pdf',
      unlocked: false,
      requiredPoints: 40,
      category: 'intermediate',
      icon: 'edit_note'
    },

    // Advanced Level Resources
    {
      id: 7,
      title: 'Advanced Angular Patterns',
      type: 'pdf',
      description: 'Learn advanced design patterns, performance optimization, and best practices',
      url: '/assets/resources/advanced-patterns.pdf',
      unlocked: false,
      requiredPoints: 50,
      category: 'advanced',
      icon: 'psychology'
    },
    {
      id: 8,
      title: 'Testing Angular Apps',
      type: 'ppt',
      description: 'Comprehensive guide to unit testing and e2e testing in Angular',
      url: '/assets/resources/testing-angular.pptx',
      unlocked: false,
      requiredPoints: 60,
      category: 'advanced',
      icon: 'science'
    },
    {
      id: 9,
      title: 'Angular Security',
      type: 'pdf',
      description: 'Security best practices, authentication, authorization, and common vulnerabilities',
      url: '/assets/resources/angular-security.pdf',
      unlocked: false,
      requiredPoints: 70,
      category: 'advanced',
      icon: 'security'
    }
  ];

  get filteredResources() {
    return this.resources.filter(r => r.category === this.selectedCategory);
  }

  constructor() {
    // Fetch user's current points
    const score = localStorage.getItem('currentScore');
    this.currentPoints = score ? parseInt(score) : 0;
    
    // Update unlocked status based on points
    this.resources = this.resources.map(resource => ({
      ...resource,
      unlocked: this.currentPoints >= resource.requiredPoints
    }));
  }

  filterCategory(category: 'beginner' | 'intermediate' | 'advanced') {
    this.selectedCategory = category;
  }

  downloadResource(resource: Resource) {
    if (!resource.unlocked) return;
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = resource.url;
    link.download = resource.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
} 