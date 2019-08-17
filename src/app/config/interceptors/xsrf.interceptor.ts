import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

  // this intercept will add the CSRF Token as header on every request
  // the X-XSRF-TOKEN is needed by Spring Security
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenExtractor.getToken();

    let xhr = req;

    if (token) {
      xhr = req.clone({
        setHeaders: {'X-XSRF-TOKEN': token}
      });
    }

    return next.handle(xhr);

  }

}
