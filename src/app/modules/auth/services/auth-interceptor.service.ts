import { Store } from '@ngrx/store';
import { exhaustMap, first } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AppState } from 'src/app/store/app.reducer';
import * as fromAuthSelector from '../Store/auth.selector';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(fromAuthSelector.getAccessToken).pipe(
      first(),
      exhaustMap((accessToken) => {
        if (!accessToken) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
