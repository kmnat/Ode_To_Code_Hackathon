import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDominoComponent } from './game-domino.component';

describe('GameDominoComponent', () => {
  let component: GameDominoComponent;
  let fixture: ComponentFixture<GameDominoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDominoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
