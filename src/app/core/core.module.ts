import { AuthInterceptor } from './../modules/auth/services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorService } from './../services/app-interceptor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
