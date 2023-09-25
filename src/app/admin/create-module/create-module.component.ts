import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FileByModule, Module } from '../modele-admin/module.model';
import { AdminService } from 'src/app/services/admin.service';
import { fileByModule } from 'src/app/model/fileModule.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Observable } from 'rxjs';
import { ListModule } from 'src/app/model/module.model';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent implements OnInit {
  fileModule: any = File;
  formModule!: FormGroup;
  formFichier!: FormGroup;
  fileNam!: string;
  isModal: boolean = false
  Loader = false
  isLoading: boolean = false;
  module: Module = new Module()
  showLabel = true;
  modules!: Array<Module>
  isVerification!: string;
  codeModule!: number
  constructor(private serviceModule: InscriptionService, private adminService: AdminService, private toastr: ToastrService, private http: HttpClient, private fb: FormBuilder, private seviceAdmin: AdminService, private router: Router) {

  }

  ngOnInit(): void {
    /*____formModule____*/
    this.formModule = this.fb.group({
      nom: this.fb.control("", [Validators.required]),
      code: this.fb.control(this.codeModule),
      date: this.fb.control(new Date())
    });


    /*____formFichier____*/
    this.formFichier = this.fb.group({
      idModule: this.fb.control("", [Validators.required]),
      type: this.fb.control("", [Validators.required]),
      date: this.fb.control(new Date()),
      isFile: this.fb.control("", [Validators.required]),
    })
    this.getMaxCodeModule();
    this.getListeModule();
  }
  getListeModule() {
    this.adminService.listModule().subscribe({
      next: (data) => {
        this.modules = data
        console.log(this.modules)
      }, error: (err) => {
        if (err) {
          window.localStorage.clear();
          this.toastr.warning("La durre de validation est atteint il faut reconecter", "Notification")
        }
      }
    })

  }

  getMaxCodeModule() {
    this.adminService.getMaxCodeModule().subscribe({
      next: (data) => {
        this.codeModule = data
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
  }

  handleModule() {
    if (this.formModule.valid) {
      this.module = this.formModule.value
      this.adminService.createModule(this.module).subscribe({
        next: (data) => {
          this.formModule.reset(0)
          this.getListeModule()
          this.isModal = !this.isModal
          this.getMaxCodeModule();
        }, error: (err) => {
          if (err.status == 401 || err.status == 403) {
            window.localStorage.clear();
            window.location.reload()
          }
        }
      })

    }
  }
  /*_____Selectio de fichier_____*/
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileModule = file[0];
    this.fileNam = file[0].name

  }


  //Modal
  openModal() {
    this.isModal = true
  }
  desactiverModal() {
    this.isModal = false
    this.formModule.reset(0)
  }

  loading() {
    setTimeout(() => {
      this.Loader = false
      this.toastr.success("Success", "Enregitrementfichier")
      this.formFichier.reset(0);
    }, 3000)
  }

  //Crefation de FieByModule8
  ajouterFileBy() {
    if (this.formFichier.valid && this.fileNam != "") {
      let mots = this.fileNam;
      //reference de point derniere
      let dernierPointIndex = mots.lastIndexOf('.');
      let dernierMot = mots.substring(dernierPointIndex + 1);

      let formFile = new FileByModule();
      formFile = this.formFichier.value
      formFile.fileName = this.fileNam
      let verification = this.verificationExtension(formFile.type!, dernierMot);
      if (verification) {
        this.isVerification = "";
        this.isLoading = true;
        this.adminService.createFileByModule(formFile).subscribe({
          next: (data) => {
            const formData = new FormData();
            formData.append("files", this.fileModule, this.fileNam);
            this.adminService.uploadeFile(formData, data.id!).subscribe({
              next: (data) => {
                this.formFichier.reset(0)
                this.fileNam = ""
                this.isLoading = false;
              }, error: (err) => {

                console.log(err)
                this.formFichier.reset(0)
                this.fileNam = ""
                this.isLoading = false;
              }
            })
          }, error: (err) => {
            if (err.status == 401 || err.status == 403) {
              window.localStorage.clear();
              window.location.reload()
            }
          }
        })

      } else {
        this.isVerification = "Le fichier selectioner ne correspond en type " + formFile.type
      }

    }
  }
  verificationExtension(type: string, extension: string): boolean {
    let arraysAudio = ["mp3", "mp2"];
    let arraysVidoes = ["mp4", "avi"];
    let arraysDoc = ["docx", "doc"];
    if (type == 'audio') {
      return arraysAudio.includes(extension)
    }
    else if (type == 'video') {
      return arraysVidoes.includes(extension)
    }
    else if (type == 'document') {
      return arraysDoc.includes(extension)
    }
    else {
      return false;
    }
  }
}
