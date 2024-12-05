import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { PageModel } from "@core/domain/models/page-model";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ProductModel } from "@core/domain/models/product-model";
import { ProductService } from "@core/domain/services/product.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductsDialogFormComponent } from '../components/products-dialog-form/products-dialog-form.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { Title } from '@angular/platform-browser';
import { checkAccessCode } from "@core/infra/utils/check-Access-code";
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  protected readonly checkAccessCode = checkAccessCode;
  protected appRoutes = appRoutes;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  private _destroy$ = new Subject();
  private pageable: PageRequestForm = {
    size: 10,
  };
  protected page!: PageModel<ProductModel>;
  protected dataSources: MatTableDataSource<ProductModel> = new MatTableDataSource<ProductModel>([]);
  protected displayedColumns: string[] = ['model', 'client', 'type', 'action'];

  constructor(
    public dialog: MatDialog,
    private _productService: ProductService,
    private _translate: TranslateService,
    private titleService: Title,
    private _toast: ToastService,
  ) {
    const pageTitle = _translate.instant("page-title.register-products");
    this.titleService.setTitle(pageTitle);
  }

  ngOnInit(): void {
    this.dataSources.paginator = this.paginator;
    this.initDataPage();
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  protected handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dataSources.filter = input.value;
  }

  private initDataPage() {
    this._productService.pageable(this.pageable)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.page = data;
        this.dataSources = new MatTableDataSource<ProductModel>(this.page.content);
      });
  }

  public pageUpdate(event: { pageIndex: number; pageSize: number }): void {
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.initDataPage();
  }

  public create(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      title: "products-dialog.title-register"
    };
    const dialogRefEdit = this.dialog.open(ProductsDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public view(element: ProductModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      element,
      title: "products-dialog.title-view",
      disabled: true
    };
    const dialogRefEdit = this.dialog.open(ProductsDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public edit(element: ProductModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    dialogConfig.data = {
      element,
      title: "products-dialog.title-edit",
    };
    const dialogRefEdit = this.dialog.open(ProductsDialogFormComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

  public delete(element: ProductModel): void {
    const deleteItem = (id: string) => {
      this._productService.delete(id).subscribe(() => this.initDataPage());
      const toastMessage = this._translate.instant("toasts.delete-product");
      this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: element.id,
      name: element.model,
      title: "products-dialog.title-delete",
      subtitle: "dialogs.cannot-be-undone",
      btnConfirmLabel: "common.delete",
      btnCancelLabel: "common.cancel",
      callback: deleteItem,
    };
    dialogConfig.enterAnimationDuration = '150ms';
    dialogConfig.exitAnimationDuration = '150ms';
    const dialogRefEdit = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRefEdit.afterClosed().subscribe(() => this.initDataPage());
  }

}
