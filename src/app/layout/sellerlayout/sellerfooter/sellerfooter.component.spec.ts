import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerfooterComponent } from './sellerfooter.component';

describe('SellerfooterComponent', () => {
  let component: SellerfooterComponent;
  let fixture: ComponentFixture<SellerfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerfooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
