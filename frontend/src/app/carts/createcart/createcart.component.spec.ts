import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecartComponent } from './createcart.component';

describe('CreatecartComponent', () => {
  let component: CreatecartComponent;
  let fixture: ComponentFixture<CreatecartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
