import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerinfoComponent } from './sellerinfo.component';

describe('SellerinfoComponent', () => {
  let component: SellerinfoComponent;
  let fixture: ComponentFixture<SellerinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
