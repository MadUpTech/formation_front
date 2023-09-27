import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/inscription.model';
import { ListModule } from '../model/module.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }
  public inscription(utilisateur: Utilisateur): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/utilisateur", utilisateur);
  }

  public getModule(): Observable<Array<ListModule>> {
    return this.http.get<Array<ListModule>>(environment.backEndHost + "/api/list_module");
  }
}
