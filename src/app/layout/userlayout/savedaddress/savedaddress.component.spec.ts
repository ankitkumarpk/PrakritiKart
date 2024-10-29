import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedaddressComponent } from './savedaddress.component';

describe('SavedaddressComponent', () => {
  let component: SavedaddressComponent;
  let fixture: ComponentFixture<SavedaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedaddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
