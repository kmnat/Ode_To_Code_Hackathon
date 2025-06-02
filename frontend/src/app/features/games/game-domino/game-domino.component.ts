import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

interface Puzzle {
  question: string;
  pairs: { num: number; left: string; right: string }[];
  correct: Record<number, string>;
}

@Component({
  selector: 'app-game-domino',
  standalone: true,

  imports: [CommonModule, FormsModule],
  templateUrl: './game-domino.component.html',
  styleUrls: ['./game-domino.component.scss']
})

export class GameDominoComponent implements AfterViewInit {
  @ViewChildren('domino') dominoes!: QueryList<ElementRef>;
  @ViewChildren('draggable') draggableItems!: QueryList<ElementRef>;
  @ViewChildren('dropzone') dropZones!: QueryList<ElementRef>;

  puzzles: Puzzle[] = [
    {
      question: 'Match numbers to words',
      pairs: [
        { num: 1, left: '1', right: 'One' },
        { num: 2, left: '2', right: 'Two' },
        { num: 3, left: '3', right: 'Three' }
      ],
      correct: { 1: 'One', 2: 'Two', 3: 'Three' }
    },
    {
      question: 'Match fruits to color',
      pairs: [
        { num: 1, left: 'Apple', right: 'Red' },
        { num: 2, left: 'Banana', right: 'Yellow' },
        { num: 3, left: 'Grape', right: 'Purple' }
      ],
      correct: { 1: 'Red', 2: 'Yellow', 3: 'Purple' }
    }
  ];

  current = 0;
  userMatches: Record<number, string> = {};
  showModal = false;

  ngAfterViewInit(): void {
    gsap.set(this.dominoes.map(d => d.nativeElement), { transformOrigin: 'left bottom' });
    (window as any).angularComponent = this;
  }

  openPuzzle(index: number) {
    if (index === this.current * 5) {
      this.showModal = true;
      this.userMatches = {};

      // Allow modal DOM to render first
      setTimeout(() => {
        this.initDraggable();
      });
    }
  }

  initDraggable() {
    const drops = this.dropZones.toArray().map(el => el.nativeElement);

    this.draggableItems.forEach(dragRef => {
      const el = dragRef.nativeElement;

      // Reset position on open
      gsap.set(el, { x: 0, y: 0 });

      Draggable.create(el, {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: '.modal-content',
        onPress: function () {
          this['startX'] = this['x'];
          this['startY'] = this['y'];

          el.style.zIndex = '1000';
        },
        onRelease: function (this: Draggable) {
          const component = (window as any).angularComponent;
          const hit = drops.find(drop => this.hitTest(drop, '50%'));

          if (hit) {
            const key = parseInt(hit.getAttribute('data-key'), 10);
            const value = el.innerText.trim();

            // If dropzone already has a match, reset previous draggable
            const prevMatch = Object.entries(component.userMatches)
              .find(([k, v]) => +k === key);

            if (prevMatch) {
              component.resetDraggableByValue(prevMatch[1]);
            }

            // Assign match
            component.userMatches[key] = value;

            // Snap draggable to dropzone
            gsap.to(el, {
              x: hit.offsetLeft - el.offsetLeft,
              y: hit.offsetTop - el.offsetTop,
              duration: 0.3,
              onComplete: () => {
                el.style.zIndex = '';
              }
            });
          } else {
            // Reset position if not dropped on any dropzone
            gsap.to(el, {
              x: this.startX,
              y: this.startY,
              duration: 0.3,
              onComplete: () => {
                el.style.zIndex = '';
              }
            });

            // Remove match if draggable was assigned somewhere
            component.removeMatchByValue(el.innerText.trim());
          }
        }
      });
    });
  }

  resetDraggableByValue(value: string) {
    this.draggableItems.forEach(dragRef => {
      const el = dragRef.nativeElement;
      if (el.innerText.trim() === value) {
        gsap.to(el, { x: 0, y: 0, duration: 0.3 });
        Object.keys(this.userMatches).forEach(key => {
          if (this.userMatches[+key] === value) {
            delete this.userMatches[+key];
          }
        });
      }
    });
  }

  removeMatchByValue(value: string) {
    Object.keys(this.userMatches).forEach(key => {
      if (this.userMatches[+key] === value) {
        delete this.userMatches[+key];
      }
    });
  }

  submitPuzzle() {
    // const correct = this.puzzles[this.current].correct;
    // const isCorrect = Object.keys(correct).every(key => correct[+key] === this.userMatches[+key]);
    
    const correct = this.puzzles[this.current].correct;
    const isCorrect = Object.keys(correct).every(
      key => correct[+key] === this.userMatches[+key]
    );


    if (isCorrect) {
      this.fallNextFiveDominoes();
      this.current++;
      this.showModal = false;

       const score1 = this.current * 10; // 10 points per puzzle

    // Send score to backend
    this.sendScoreToBackend(score1);
    } else {
      alert('Some matches are incorrect. Try again!');
    }
  }

  sendScoreToBackend(score: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    fetch('http://localhost:5000/api/grads/update-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ score1: score })
    })
    .then(async res => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update score');
      }
      return res.json();
    })
    .then(data => {
      console.log('Score updated successfully:', data);
      // You could show a success message to the user here
    })
    .catch(err => {
      console.error('Failed to update score:', err.message);
      // You could show an error message to the user here
    });
  }

  fallNextFiveDominoes() {
    const allDominoes = this.dominoes.toArray();
    const start = this.current * 5;
    for (let i = start; i < start + 5 && i < allDominoes.length; i++) {
      gsap.to(allDominoes[i].nativeElement, {
        rotate: 90,
        duration: 0.5,
        delay: (i - start) * 0.2,
        ease: 'power2.inOut'
      });
    }
  }
}
