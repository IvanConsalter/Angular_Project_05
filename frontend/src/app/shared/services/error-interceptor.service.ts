import { catchError } from 'rxjs/operators';
import { LocalStorage } from './../utils/localstorage';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  localStorage = new LocalStorage();

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError( error => {

      if(error instanceof HttpErrorResponse) {
        if(error.status === 401) {
          this.localStorage.limparDadosLocaisUsuario();
          this.router.navigate(['/conta/login']);
        }
        if(error.status === 403) {
          this.router.navigate(['acesso-negado']);
        }
      }

      return throwError(() => error);
    }));
  }

}
