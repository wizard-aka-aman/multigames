import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeLadderComponent } from './snake-ladder.component';

describe('SnakeLadderComponent', () => {
  let component: SnakeLadderComponent;
  let fixture: ComponentFixture<SnakeLadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeLadderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeLadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
