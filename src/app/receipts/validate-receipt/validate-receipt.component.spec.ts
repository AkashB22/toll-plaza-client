import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateReceiptComponent } from './validate-receipt.component';

describe('ValidateReceiptComponent', () => {
  let component: ValidateReceiptComponent;
  let fixture: ComponentFixture<ValidateReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
