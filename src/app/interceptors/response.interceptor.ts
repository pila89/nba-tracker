import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router,private toastService: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof ErrorEvent) {
          console.log('this is an error in the code');
        } else {
          console.log('this is an error return by the server');
          this.toastService.error(err.error.message);
          if (err.status == 401) {
            this.router.navigateByUrl('/login'); //user non autorise
          }
          if (err.status == 404) {
            this.router.navigateByUrl('/404'); //n´existe pas
          }
          if (err.status == 500) {
            this.router.navigateByUrl('/500'); //error serveur
          }
        }
        return throwError(err);
      })
    );
  }
}

