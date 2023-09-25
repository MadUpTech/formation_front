import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  formLogina!: FormGroup;
  isPayement: boolean = false;

  constructor(private toast: ToastrService, private fb: FormBuilder, private seviceAuth: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.formLogina = this.fb.group({
      emaila: this.fb.control("", [Validators.required]),
      passworda: this.fb.control("", [Validators.required])
    })

    this.formLogin = this.fb.group({
      email: this.fb.control("", [Validators.email, Validators.required]),
      password: this.fb.control("", [Validators.required, Validators.maxLength(20), Validators.minLength(8)])
    });
  }

  handleLogin() {
    if (this.formLogin.valid) {
      let email = this.formLogin.value.email;
      let password = this.formLogin.value.password
      this.seviceAuth.login(email, password).subscribe({
        next: (data) => {
          this.seviceAuth.loadProfile(data.jwtToken)
          if (data.role == "ADMIN") {
            this.router.navigateByUrl("/admin");
          } else {
            window.localStorage.setItem("isMod", "1")
            this.router.navigateByUrl("/client");
          }
          this.toast.success("Connexion success!");
        }, error: (err) => {
          if (err.status == 500) {
            this.toast.warning("Votre mot de passe saisie ou email incorrect", "Erreur")
          }
          if (err.status == 401) {
            this.isPayement = true
          } else {
            this.toast.warning("Votre mot de passe saisie ou email incorrect", "Erreur")
          }
        }
      })
    }
  }
  isOk() {
    this.isPayement = false
  }

}
