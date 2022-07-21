import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  post(url: string, body: any, options: any): Observable<any> {
    url = `${this.baseUrl}/${url}`;
    options = {
      headers: new HttpHeaders(options.headers || {}),
      observe: options.observe || 'response',
      params: new HttpParams({ fromObject: options.params || {} }),
      reportProgress: options.reportProgress || false,
      responseType: options.responseType || 'json',
      withCredentials: options.withCredentials || false,
    };
    return this.http.post(url, body, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  get(url: string, options: any): Observable<any> {
    url = `${this.baseUrl}/${url}`;
    options = {
      headers: new HttpHeaders(options.headers || {}),
      observe: options.observe || 'response',
      params: new HttpParams({ fromObject: options.params || {} }),
      reportProgress: options.reportProgress || false,
      responseType: options.responseType || 'json',
      withCredentials: options.withCredentials || false,
    }

    return this.http.get(url, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => {
      if(error.error && error.error){
        return error.error;
      } else{
        return new Error('Something bad happened; please try again later.');
      }
    });
  }
}
