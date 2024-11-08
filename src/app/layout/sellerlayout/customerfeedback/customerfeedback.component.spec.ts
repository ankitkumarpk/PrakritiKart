import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerfeedbackComponent } from './customerfeedback.component';

describe('CustomerfeedbackComponent', () => {
  let component: CustomerfeedbackComponent;
  let fixture: ComponentFixture<CustomerfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerfeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
