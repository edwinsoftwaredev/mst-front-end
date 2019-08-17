import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'), // to avoid authentication popup from Spring
      withCredentials: true // to send cookies (JSESSIONID)
    });

    return next.handle(xhr);
  }

}
