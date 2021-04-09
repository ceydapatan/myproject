import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecartComponent } from './updatecart.component';

describe('UpdatecartComponent', () => {
  let component: UpdatecartComponent;
  let fixture: ComponentFixture<UpdatecartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
