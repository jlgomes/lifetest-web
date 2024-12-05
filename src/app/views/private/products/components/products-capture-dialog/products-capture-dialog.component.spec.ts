import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCaptureDialogComponent } from './products-capture-dialog.component';

describe('ProductsCaptureDialogComponent', () => {
  let component: ProductsCaptureDialogComponent;
  let fixture: ComponentFixture<ProductsCaptureDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsCaptureDialogComponent]
    });
    fixture = TestBed.createComponent(ProductsCaptureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
