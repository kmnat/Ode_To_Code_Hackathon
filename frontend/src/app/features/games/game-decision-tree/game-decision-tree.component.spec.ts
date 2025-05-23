import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDecisionTreeComponent } from './game-decision-tree.component';

describe('GameDecisionTreeComponent', () => {
  let component: GameDecisionTreeComponent;
  let fixture: ComponentFixture<GameDecisionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDecisionTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDecisionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
