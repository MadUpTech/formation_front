import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/profile.model';
//import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  isAuthenticated: boolean = false
  roles!: string;
  idConnecter!: string;
  id!: string;
  accessToken!: string;
  nom!: string
  user: User = new User();
  constructor(private http: HttpClient, private router: Router) { }
  public login(email: string, password: string): Observable<any> {
    const data = {
      username: email,
      password: password
    }
    return this.http.post(environment.backEndHost + "/api_auth/login", data);
  }

  public loadProfile(jwt: string) {
    try {
      let jwt_decode: any = jwtDecode(jwt);
      if (jwt_decode.iss && jwt_decode.iss == "is_formation_v1_v123412345") {
        this.isAuthenticated = true;
        this.id = jwt_decode.string
        this.roles = jwt_decode.roles
        this.accessToken = jwt
        this.getUtilisateur(this.id);
        window.localStorage.setItem("jwt_token", this.accessToken)
      } else if (jwt_decode.iss && jwt_decode.iss == "is_formation_v1_v1234") {
        this.isAuthenticated = true;
        this.id = jwt_decode.string
        this.roles = jwt_decode.roles
        this.accessToken = jwt
        this.getUtilisateur(this.id);
        window.localStorage.setItem("jwt_token", this.accessToken)
      } else {
        window.localStorage.clear()
        this.router.navigateByUrl("/")
      }

    } catch (error: any) {
      alert("Fait  Attention le tentantive de frode");
      window.localStorage.clear()
      this.router.navigateByUrl("/")

    }

  }
  getTokenByLocalstorage() {
    let jwtToken = window.localStorage.getItem("jwt_token");
    if (jwtToken) {
      this.loadProfile(jwtToken)
    } else {
      //this.router.navigateByUrl("/")
    }
  }
  public getUtilisateur(id: string) {
    this.http.get<User>(environment.backEndHost + "/api/get_utilisateur/" + this.id).subscribe({
      next: (data) => {
        this.user = data
        this.nom = data.nom!
      }
    });

  }
}
