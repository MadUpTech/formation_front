import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CorrectionRequest, ExamenList, Module, User } from '../modele-admin/module.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-examen',
  templateUrl: './detail-examen.component.html',
  styleUrls: ['./detail-examen.component.scss']
})
export class DetailExamenComponent implements OnInit {
  fileCorrection: any = File;
  fileNam!: string;
  idModule!: number;
  idClient!: string;
  listExamen!: Array<ExamenList>;
  formCorrection!: FormGroup;
  module!: Array<Module>;
  moduleSuivant!: number;
  isModuleSuivant: boolean = false;
  // correctionRequest: CorrectionRequest = new CorrectionRequest();
  idExamen!: number
  isModalCorrection: boolean = false;
  isDisabled: boolean = false;
  isClient: User = new User()
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private adminService: AdminService) {
    this.idModule = parseInt(this.route.snapshot.queryParamMap.get('isMod')!);
    this.idClient = this.route.snapshot.queryParamMap.get('isCl')!;
    this.moduleSuivant = this.idModule + 1;

  }

  ngOnInit(): void {
    this.getListExamenByClient();
    this.getClient();
    this.getListModuleByClient();
    this.getIsModule()
    this.formCorrection = this.fb.group({
      status: this.fb.control("", [Validators.required]),
      isFile: this.fb.control("", [Validators.required])
    });
  }

  getIsModule() {
    this.adminService.isModuleSuivant(this.idClient, this.moduleSuivant).subscribe({
      next: (data) => {
        this.isModuleSuivant = data
        console.log(data);
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  activeModuleSuivant() {
    let moduleSuivant = this.idModule + 1;
    this.adminService.addUserByModule(this.idClient, moduleSuivant).subscribe({
      next: (data) => {
        console.log(data)
        this.getIsModule();
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  getClient() {
    this.adminService.getClient(this.idClient).subscribe({
      next: (data) => {
        this.isClient = data;
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
  }
  getListExamenByClient() {
    this.adminService.getListExamenByClientAndModule(this.idClient, this.idModule).subscribe({
      next: (data) => {
        this.listExamen = data.filter(res => {
          return res.user?.status == 1;
        })
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
  }

  telechargerExamen(idExamane: number, fileName: string) {
    this.adminService.telechargerDocExamen(idExamane).subscribe({
      next: (data) => {
        console.log(data)
        let blob: Blob = data.body as Blob
        let a = document.createElement('a');
        //let dernierPointIndex = fileName.lastIndexOf('.');
        let vraisrMot = fileName.split('.');
        //console.log(vraisrMot)
        a.download = vraisrMot[0];
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    });
  }
  annullerExamen(id: number) {
    this.adminService.annullerExamen(id).subscribe({
      next: (data) => {
        this.getListExamenByClient();
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
  }

  openModalCorrection(idExamen: number) {
    this.idExamen = idExamen;
    this.isModalCorrection = true;
    this.isDisabled = true;
  }

  annullerCorrection() {
    this.isModalCorrection = false;
    this.isDisabled = false;
  }
  /*_____Selectio de fichier_____*/
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileCorrection = file[0];
    this.fileNam = file[0].name

  }

  handleCorrection() {
    let correction = new CorrectionRequest();
    if (this.formCorrection.valid) {
      correction = this.formCorrection.value
      correction.idExamen = this.idExamen
      this.adminService.saveCorrection(correction).subscribe({
        next: (data) => {
          const formData = new FormData();
          formData.append("files", this.fileCorrection, this.fileNam);
          this.adminService.uploadeFileCorrection(formData, data.id!).subscribe({
            next: (data) => {
              this.annullerCorrection();
              this.getListExamenByClient()
            }, error: (err) => {
              this.annullerCorrection();
              this.getListExamenByClient();
            }
          })
        }, error: (err) => {
          if (err.status == 401 || err.status == 403) {
            window.localStorage.clear();
            window.location.reload()
          }
        }
      })
    }
  }
  getListModuleByClient() {
    this.adminService.getListModuleByClient(this.idClient).subscribe({
      next: (data) => {
        this.module = data
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
  }

}
