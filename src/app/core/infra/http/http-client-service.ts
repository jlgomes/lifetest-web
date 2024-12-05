import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "@environments/environment";
import {AuthLocalStorageService} from "@core/domain/services/auth-local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  /**
   * Methods requests for user authentications
   *
   */
  constructor(
    private readonly _http: HttpClient,
    private readonly _authLocalStorageService: AuthLocalStorageService
  ) {
  }

  /**
   * Method requests get and check token
   * * get()
   *
   * @param url
   * @param params
   */
  public get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    const token = this._authLocalStorageService.getTokens();
    return this._http.get<T>(`${environment.API_URL}/${url}`, {
      headers: {Authorization: `Bearer ${token}`},
      params: params
    });
  }

  /**
   * Method requests post and check token
   * * post()
   *
   * @param url
   * @param payload
   */

  public post<T>(url: string, payload: any): Observable<T> {
    const token = this._authLocalStorageService.getTokens();
    return this._http.post<T>(`${environment.API_URL}/${url}`, payload, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }

  /**
   * Method requests update and check token
   * * put()
   *
   * @param url
   * @param payload
   */

  public put<T>(url: string, payload: any): Observable<T> {
    const token = this._authLocalStorageService.getTokens();
    return this._http.put<T>(`${environment.API_URL}/${url}`, payload, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }

  /**
   * Method requests delete and check token
   * * delete()
   *
   * @param url
   */

  public delete<T>(url: string): Observable<T> {
    const token = this._authLocalStorageService.getTokens();
    return this._http.delete<T>(`${environment.API_URL}/${url}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }

  /**
   * Method requests delete and check token
   * * delete()
   *
   * @param url
   * @param payload
   */

  public patch<T>(url: string, payload?: any): Observable<T> {
    const token = this._authLocalStorageService.getTokens();
    return this._http.patch<T>(`${environment.API_URL}/${url}`, payload,{
      headers: {Authorization: `Bearer ${token}`},
    });
  }

  /**
   * Method requests get all and check token
   * * getAll()
   *
   * @param url
   */
  public getAll<T>(url: string): Observable<T> {
    const token = this._authLocalStorageService.getTokens();
    return this._http.get<T>(`${environment.API_URL}/${url}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }

  /**
   * Method requests get media and check token
   * * getMedia()
   * @param url
   */

  public getMedia(url: string): Observable<any> {
    const token = this._authLocalStorageService.getTokens();
    return this._http.get(`${environment.API_URL}/${url}`, {
      headers: {Authorization: `Bearer ${token}`},
      responseType: 'text',
      observe: 'response',
    })
  }
}
