import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class AppAuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthentificationService) { }
  //https://api.orange.com/

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("/api_auth") || request.url.includes("/connexion") || request.url.includes("/api/utilisateur") || request.url.includes("https://api.orange.com/")) {
      //implimatation de bearar     
      return next.handle(request);


    } else {
      let newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.auth.accessToken)
      })
      return next.handle(newRequest);

    }


  }
}
