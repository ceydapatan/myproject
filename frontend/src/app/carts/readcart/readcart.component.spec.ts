import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadcartComponent } from './readcart.component';

describe('ReadcartComponent', () => {
  let component: ReadcartComponent;
  let fixture: ComponentFixture<ReadcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
