import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ExamenByList, ExamenList, Module } from '../modele-admin/module.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-examen',
  templateUrl: './validation-examen.component.html',
  styleUrls: ['./validation-examen.component.scss']
})
export class ValidationExamenComponent implements OnInit {
  examenList!: Array<ExamenList>;
  examenListBySum!: Array<ExamenByList>;
  idModule: number = 1;
  listModule!: Array<Module>;
  sizeExamenByModule!: number;
  totalPageItems: any;
  page: number = 1;


  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getListExame()
    this.getListExameBysum()
    this.getListModule()
    this.getSizehExamenByModule();
  }

  getListModule() {
    this.adminService.listModule().subscribe({
      next: (data) => {
        this.listModule = data
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  changeListByModule(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.idModule = parseInt(value)
    this.getListExameBysum()
    this.getSizehExamenByModule()
  }

  getListeModule() {
    this.adminService.listModule().subscribe({
      next: (data) => {
      }
    })
  }
  getListExame() {
    this.adminService.getListExamen().subscribe({
      next: (data) => {
        this.examenList = data
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getListExameBysum() {
    this.adminService.getListExamenBysum(this.idModule).subscribe({
      next: (data) => {
        this.examenListBySum = data
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  test() {
    let stringg = "test.mp3"
    let d = stringg.split(".mp3")
  }
  voirDetails(idModule: number, idClient: string) {
    this.router.navigateByUrl("/admin/detail?isMod=" + idModule + "&isCl=" + idClient);
  }
  getSizehExamenByModule() {
    this.adminService.getSizeExameByModule(this.idModule).subscribe({
      next: (data) => {
        this.sizeExamenByModule = data
        //console.log(data)
      }, error: (err) => {
        console.log(err);
      }
    })
  }

}
