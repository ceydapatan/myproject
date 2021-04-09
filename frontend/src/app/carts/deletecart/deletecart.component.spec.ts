import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecartComponent } from './deletecart.component';

describe('DeletecartComponent', () => {
  let component: DeletecartComponent;
  let fixture: ComponentFixture<DeletecartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
