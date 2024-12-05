import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCropDialogComponent } from './products-crop-dialog.component';

describe('ProductsCropDialogComponent', () => {
  let component: ProductsCropDialogComponent;
  let fixture: ComponentFixture<ProductsCropDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsCropDialogComponent]
    });
    fixture = TestBed.createComponent(ProductsCropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
