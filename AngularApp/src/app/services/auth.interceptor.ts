// import { Injectable, inject } from '@angular/core';
// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private auth = inject(AuthService);

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.auth.getToken();
//     if (token) {
//       const cloned = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return next.handle(cloned);
//     }
//     return next.handle(req);
//   }
// }


import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');

  // If token exists, clone the request and add Authorization header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // Otherwise, send the request as-is
  return next(req);
};
