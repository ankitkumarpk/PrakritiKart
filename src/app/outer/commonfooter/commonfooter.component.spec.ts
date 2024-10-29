import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonfooterComponent } from './commonfooter.component';

describe('CommonfooterComponent', () => {
  let component: CommonfooterComponent;
  let fixture: ComponentFixture<CommonfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonfooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
