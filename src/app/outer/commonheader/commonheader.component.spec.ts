import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonheaderComponent } from './commonheader.component';

describe('CommonheaderComponent', () => {
  let component: CommonheaderComponent;
  let fixture: ComponentFixture<CommonheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
