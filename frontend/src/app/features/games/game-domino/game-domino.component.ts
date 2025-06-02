<<<<<<< HEAD
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
=======
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
>>>>>>> e45c89e5b249478d2b123b33a0cdaadf0faf1d01
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
  @ViewChildren('bonusDominoPopup') bonusDominoesInPopup!: QueryList<ElementRef>;

  puzzles: Puzzle[] = [
    {
      question: "Citi\'s Value Proposition is centered on serving as a trusted partner to clients. This is achieved by responsibly providing financial services that not only enable growth and economic progress but also adhere to Citi\'s Code of Conduct. Understanding this foundation is key to recognizing how Citi operates. Now, based on this, Match Citi\'s core values to their descriptions.",
      pairs: [
        { num: 1, left: 'Strategy', right: 'Leading the next era of global business & Investing in our team' },
        { num: 2, left: 'Organizational Structure', right: 'Services, Markets, Banking & International, Wealth, U.S. Personal Banking' },
        { num: 3, left: 'Responsibility', right: 'Think before you act & Systemically responsible' }
      ],
      correct: {
        1: 'Leading the next era of global business & Investing in our team',
        2: 'Services, Markets, Banking & International, Wealth, U.S. Personal Banking',
        3: 'Think before you act & Systemically responsible'
      }
    },
    {
      question: "Compliance Risk stems from violations of laws, regulations, or internal policies, potentially causing financial instability, legal breaches, and non-conformance with prescribed practices. Key consequences include diminished reputation, limited business opportunities, and penalties.\n\nThe Compliance Risk Management Framework is built on three lines of defense:\n1.  First Line - The Business: Directly owns and manages operational risks.\n2.  Second Line - ICRM (Independent Compliance Risk Management): Oversees the First Line, monitoring adherence to Laws, Rules, Regulations (LRRs) and Policies. It also challenges and escalates issues to ensure the First Line operates within the defined compliance risk appetite.\n3.  Third Line - Internal Audit: Provides independent assurance on the effectiveness of risk management and controls.\n\nBased on this framework, match each line of defense (First Line, Second Line - ICRM, Third Line) to its primary role.",
      pairs: [
        { num: 1, left: 'First Line', right: 'The Business' },
        { num: 2, left: 'Second Line', right: 'ICRM (Independent Compliance Risk Management) - Monitor adherence by First Line to Laws, Rules and Regulations (LRRs) and Policies. Credible challenge and escalation to drive First Line to operate with compliance risk appetite.' },
        { num: 3, left: 'Third Line', right: 'Internal Audit' }
      ],
      correct: { 
        1: 'The Business', 
        2: 'ICRM (Independent Compliance Risk Management) - Monitor adherence by First Line to Laws, Rules and Regulations (LRRs) and Policies. Credible challenge and escalation to drive First Line to operate with compliance risk appetite.', 
        3: 'Internal Audit' 
      }
    },
    {
      question: "The Personal Trading & Investment Policy (PTIP) guides employee trading to prevent conflicts of interest and misuse of position. It defines key terms like Covered Person, Covered Accounts, Passive/Managed Accounts, and Reportable Accounts (which includes specific rules for disclosures, like for ESOPs, and exemptions, like for certain mutual funds). Match the PTIP terms to their detailed descriptions.",
      pairs: [
        { num: 1, left: 'What is PTIP?', right: 'Policy for personal trading by Covered Persons to prevent conflicts of interest and misuse of position, ensuring compliance with laws.' },
        { num: 2, left: 'Who is a Covered Person?', right: 'Specific individuals designated by PTIP, Compliance, or Legal, to whom the policy applies.' },
        { num: 3, left: 'Defining Covered Accounts', right: 'Accounts where a Covered Person can influence trading/investment decisions in securities, derivatives, etc.' },
        { num: 4, left: 'Passive or Managed Accounts', right: 'Fully managed accounts where Covered Person lacks trading influence; restrictions apply (e.g., India Private side).' },
        { num: 5, left: 'Reportable Accounts', right: 'Includes \"Covered\" & \"Passive\" accounts for trading securities; ESOPs need disclosure. Mutual fund-only accounts are non-reportable.' }
      ],
      correct: {
        1: 'Policy for personal trading by Covered Persons to prevent conflicts of interest and misuse of position, ensuring compliance with laws.',
        2: 'Specific individuals designated by PTIP, Compliance, or Legal, to whom the policy applies.',
        3: 'Accounts where a Covered Person can influence trading/investment decisions in securities, derivatives, etc.',
        4: 'Fully managed accounts where Covered Person lacks trading influence; restrictions apply (e.g., India Private side).',
        5: 'Includes \"Covered\" & \"Passive\" accounts for trading securities; ESOPs need disclosure. Mutual fund-only accounts are non-reportable.'
      }
    },
    {
      question: "The Outside Directorships and Business Interests Policy (ODBI) establishes a consistent framework for how Citi employees should handle outside business activities. It emphasizes the need for prudent judgment and approvals before accepting any external employment, directorship, or other business affiliations.\n\nNow, complete the core statement: The ODBI policy provides a framework for the ____(1)____ and ____(2)____ of outside business activities, requiring employees to exercise ____(3)____ and obtain the ____(4)____ before accepting such roles.",
      pairs: [
        { num: 1, left: 'Blank (1)', right: 'disclosure' },
        { num: 2, left: 'Blank (2)', right: 'review' },
        { num: 3, left: 'Blank (3)', right: 'prudent judgment' },
        { num: 4, left: 'Blank (4)', right: 'necessary approvals' }
      ],
      correct: { 
        1: 'disclosure', 
        2: 'review', 
        3: 'prudent judgment', 
        4: 'necessary approvals'
      }
    },
    {
      question: "Citi\'s Electronic Communications Policy mandates using only approved platforms for business. From the list, identify which channels are generally APPROVED for Citi business communications and which are UNAPPROVED.",
      pairs: [
        { num: 1, left: 'Citi Email, Teams@Citi, Zoom@Citi', right: 'Approved Channels' },
        { num: 2, left: 'WhatsApp, WeChat, Personal Email', right: 'Unapproved Channels' },
        { num: 3, left: 'Symphony, Bloomberg', right: 'Approved Channels' },
        { num: 4, left: 'Signal, Telegram, Slack', right: 'Unapproved Channels' }
      ],
      correct: { 
        1: 'Approved Channels', 
        2: 'Unapproved Channels', 
        3: 'Approved Channels', 
        4: 'Unapproved Channels'
      }
    }
  ];

  current = 0;
  userMatches: Record<number, string> = {};
  showModal = false;
  totalScore: number = 0;
  submittedIncorrectlyThisPuzzle: boolean = false;
  showWinPopup: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.set(this.dominoes.map(d => d.nativeElement), { transformOrigin: 'left bottom' });
      (window as any).angularComponent = this;
    }
  }

  openPuzzle(index: number) {
    console.log(`openPuzzle called with index: ${index}, current puzzle: ${this.current}`);
    console.log(`Condition check: index (${index}) === this.current * 5 (${this.current * 5})`);

    if (index === this.current * 5) {
      console.log('Condition met. Setting showModal to true.');
      this.showModal = true;
      console.log(`showModal is now: ${this.showModal}`);
      this.userMatches = {};
      this.submittedIncorrectlyThisPuzzle = false;

      // Allow modal DOM to render first
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          this.initDraggable();
        }
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
            const value = el.textContent.trim();

            const prevMatch = Object.entries(component.userMatches)
              .find(([k, v]) => +k === key);

            if (prevMatch) {
              component.resetDraggableByValue(prevMatch[1]);
            }

            component.userMatches[key] = value;
            el.style.display = 'none'; // Hide the draggable immediately on drop
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
            component.removeMatchByValue(el.textContent.trim());
          }
        }
      });
    });
  }

  resetDraggableByValue(value: string) {
    this.draggableItems.forEach(dragRef => {
      const el = dragRef.nativeElement;
      if (el.textContent.trim() === value) {
        el.style.display = 'flex'; // Make it visible again
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
      if (this.submittedIncorrectlyThisPuzzle) {
        this.totalScore += 3;
        console.log('Puzzle correct (after incorrect attempts): +3 points. Total score:', this.totalScore);
      } else {
        this.totalScore += 5;
        console.log('Puzzle correct (first attempt): +5 points. Total score:', this.totalScore);
      }

      this.fallNextFiveDominoes();
      this.current++;
      this.showModal = false;
<<<<<<< HEAD
      if (this.current >= this.puzzles.length) {
        this.showWinPopup = true;
        setTimeout(() => {
          this.animatePopupDominoes();
        }, 100);
      }
=======

       const score1 = this.current * 10; // 10 points per puzzle

    // Send score to backend
    this.sendScoreToBackend(score1);
>>>>>>> e45c89e5b249478d2b123b33a0cdaadf0faf1d01
    } else {
      this.submittedIncorrectlyThisPuzzle = true;
      console.log('Puzzle incorrect. Flagging for reduced points on eventual success.');
      alert('Some matches are incorrect. Try again!');

      // Reset puzzle to initial state
      this.userMatches = {}; // Clear matches (clears green text in dropzones)
      this.draggableItems.forEach(dragRef => {
        const el = dragRef.nativeElement;
        el.style.display = 'flex'; // Make all draggables visible
        gsap.to(el, { x: 0, y: 0, duration: 0.3 }); // Move them back to initial draggable area positions
      });
      // Note: If draggables had specific initial positions other than 0,0 relative to their container, that would need to be restored here.
      // Assuming they are all in a general pool and GSAP's x:0, y:0 resets them correctly to that pool.
    }
  }

<<<<<<< HEAD
  closeWinPopup() {
    this.showWinPopup = false;
=======
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
>>>>>>> e45c89e5b249478d2b123b33a0cdaadf0faf1d01
  }

  fallNextFiveDominoes() {
    const allDominoes = this.dominoes.toArray();
    const start = this.current * 5;
    for (let i = start; i < start + 5 && i < allDominoes.length; i++) {
      const dominoElement = allDominoes[i].nativeElement;
      gsap.to(dominoElement, {
        rotate: 90,
        duration: 0.5,
        delay: (i - start) * 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          dominoElement.classList.add('fallen');
        }
      });
    }
  }

  animatePopupDominoes() {
    if (isPlatformBrowser(this.platformId) && this.bonusDominoesInPopup) {
      this.bonusDominoesInPopup.forEach((dominoRef, index) => {
        const dominoElement = dominoRef.nativeElement;
        // Reset rotation if re-triggering, though not strictly necessary here
        gsap.set(dominoElement, { rotation: 0 }); 
        gsap.to(dominoElement, {
          rotate: 0, // Changed from 90 to 0 to keep text horizontal
          duration: 0.5,
          delay: index * 0.3, // Stagger the appearance
          ease: 'power2.inOut',
          onComplete: () => {
            // Add a class if we want to style the 'appeared' state differently
            // dominoElement.classList.add('appeared-popup'); 
          }
        });
      });
    }
  }
}
