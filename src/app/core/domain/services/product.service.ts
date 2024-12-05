import { Injectable } from "@angular/core";
import { HttpClientService } from "@core/infra/http/http-client-service";
import { catchError, map, Observable } from "rxjs";
import { ProductModel } from "@core/domain/models/product-model";
import { PAGEABLE, PRODUCTS } from "@helpers/constants/path-rest-constants";
import { ProductForm } from "@core/domain/forms/product-form";
import { PageRequestForm } from "@core/domain/forms/page-request-form";
import { PageModel } from "@core/domain/models/page-model";
import { pageParamUtil } from "@core/infra/utils/page-param-util";
import { HandleErrorsService } from "@core/domain/services/handle-errors.service";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private readonly _http: HttpClientService,
    private readonly _handleErrorsService: HandleErrorsService,
  ) {
  }

  findAll(): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>(`${PRODUCTS}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  findById(id: string): Observable<ProductModel> {
    return this._http.get<ProductModel>(`${PRODUCTS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this._http.delete(`${PRODUCTS}/${id}`).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      }),
      map(() => void (0))
    );
  }

  save(data: ProductForm): Observable<ProductModel> {
    return this._http.post<ProductModel>(`${PRODUCTS}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  update(id: string, data: ProductForm): Observable<ProductModel> {
    return this._http.put<ProductModel>(`${PRODUCTS}/${id}`, data).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

  pageable(params: PageRequestForm): Observable<PageModel<ProductModel>> {
    const queryParams = pageParamUtil(params)
    return this._http.get<PageModel<ProductModel>>(`${PRODUCTS}/${PAGEABLE}`, queryParams).pipe(
      catchError(err => {
        this._handleErrorsService.execute(err.error)
        throw err.error;
      })
    );
  }

}
