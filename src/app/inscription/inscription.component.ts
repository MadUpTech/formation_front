import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InscriptionService } from '../services/inscription.service';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from '../model/inscription.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  formInscription!: FormGroup;
  incription!: Utilisateur
  validationTelephone!: string
  verificationMot_de_passe!: string
  VerificationNom!: string
  Verificationemail!: string

  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private fb: FormBuilder, private http: HttpClient, private services: InscriptionService) { }


  ngOnInit(): void {

    this.formInscription = this.fb.group({
      nom: this.fb.control(null),
      prenom: this.fb.control(null),
      telephone: this.fb.control(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      adresse: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
      password1: this.fb.control(null, [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),

    })
    this.formInscription.reset(0);
  }

  create_inscription() {
    const limit = this.verifyFirstFreeLetters(this.formInscription.value.telephone);
    const pas = this.formInscription.value.password
    const pas1 = this.formInscription.value.password1
    if (this.formInscription.value.nom == "") {
      this.VerificationNom = "Votre nom est obligatoire"
    } else {
      this.VerificationNom = ""
      if (limit == true) {
        this.validationTelephone = ""
        if (pas1 == pas) {
          this.verificationMot_de_passe = ""
          this.incription = this.formInscription.value;
          this.services.inscription(this.incription).subscribe(
            {
              next: (data) => {
                this.toastr.success("Merci,Vous etes inscrit maintenant")
                const idClient: any = data.id;
                this.router.navigateByUrl("/")
                this.formInscription.reset(0)
              }, error: (err) => {
                if (err.status == 500) {
                  this.Verificationemail = "Votre email est deja existe"
                } else
                  console.log(err)
                this.toastr.error("Le serveur ne repond pas contacter le service client", "Erreur");
              }
            }
          );
        } else {
          this.verificationMot_de_passe = "verifier le deux mots de passe"
        }
      } else {
        this.validationTelephone = "Verivier le numero[032 & 033 & 034 & 038]"
      }
    }
  }
  ///Validator
  verifyFirstFreeLetters(str: string): boolean {
    const data = ['034', '038', '032', '033'];
    const firstFreeLetters = str.substring(0, 3)
    const resultat = data.includes(firstFreeLetters);
    return resultat;
  }

  //KeyPess
  onKeyPress(event: any) {
    //(keypress)="onKeyPress($event)"
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
