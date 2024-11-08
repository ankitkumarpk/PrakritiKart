import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersidebarComponent } from './sellersidebar.component';

describe('SellersidebarComponent', () => {
  let component: SellersidebarComponent;
  let fixture: ComponentFixture<SellersidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellersidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
