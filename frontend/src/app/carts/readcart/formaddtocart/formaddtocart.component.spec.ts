import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaddtocartComponent } from './formaddtocart.component';

describe('FormaddtocartComponent', () => {
  let component: FormaddtocartComponent;
  let fixture: ComponentFixture<FormaddtocartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaddtocartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaddtocartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
