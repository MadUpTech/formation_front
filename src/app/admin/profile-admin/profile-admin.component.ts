import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/model/profile.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {
  isForm: boolean = false
  fileImage: any = File;
  fileNam!: string;
  idConnecter!: string
  formFile!: FormGroup;
  urlImage!: string
  formUpdate!: FormGroup;
  isMsgConfirme!: string;
  isMotdepass!: string


  constructor(public authService: AuthentificationService, private fb: FormBuilder, private adminService: AdminService) {
    this.idConnecter = authService.id
    this.urlImage = environment.backEndHost + "/api/telechargerImage/" + this.authService.id

  }

  ngOnInit(): void {
    this.formFile = this.fb.group({
      isFile: this.fb.control("", [Validators.required]),
    });
    this.formUpdate = this.fb.group({
      motDepasseActuel: this.fb.control("", [Validators.required, Validators.minLength(8)]),
      nouveauMotDepasse: this.fb.control("", [Validators.required, Validators.minLength(8)]),
      confirmeMotDepasse: this.fb.control("", [Validators.required, Validators.minLength(8)]),
    })
    this.getImageUrl()
  }
  openForm() {
    this.isForm = !this.isForm
  }
  fermForm() {
    this.isForm = false
  }
  //check une image
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileImage = file[0];
    this.fileNam = file[0].name
  }
  //uploade images
  handleImage() {
    if (this.formFile.valid) {
      const formData = new FormData();
      formData.append("files", this.fileImage, this.fileNam);

      this.adminService.uploadeMonImage(formData, this.idConnecter).subscribe({
        next: (data) => {
          console.log(data);
          this.isForm = false;

        }, error: (err) => {
          if (err.status == 401 || err.status == 403) {
            window.localStorage.clear();
            window.location.reload()
          }
        }
      })
    }
  }

  getImageUrl() {
    this.adminService.getImage(this.idConnecter).subscribe({
      next: (data) => {
      }, error: (err) => {
        //console.log(err)
      }

    }); // Appel à la méthode getImageUrl dans votre service
  }

  handleUpdatePassWord() {
    if (this.formUpdate.valid) {
      if (this.formUpdate.controls['nouveauMotDepasse'].value != this.formUpdate.controls['confirmeMotDepasse'].value) {
        this.isMsgConfirme = "Verifier le text saisie different de nouveau mot depasse"
      } else {
        this.isMsgConfirme = ""
        let data = new UpdatePassword();
        data.newPassword = this.formUpdate.controls['nouveauMotDepasse'].value
        data.password = this.formUpdate.controls['motDepasseActuel'].value
        data.id = this.authService.id
        console.log(data);
        this.adminService.modifierPassWord(data).subscribe({
          next: (data) => {
            this.formUpdate.reset(0);
            this.isMotdepass = "";
          }, error: (err) => {
            if (err.status == 404) {
              this.isMotdepass = "Le mot depasse saisie est incorrecte";
            }
          }
        })
      }
    }
  }
  annullerUpdatePassword() {
    this.formUpdate.reset(0)
  }


}
