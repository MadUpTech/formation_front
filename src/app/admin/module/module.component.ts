import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileByModule, Module } from '../modele-admin/module.model';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  formModule!: FormGroup;
  formFile!: FormGroup;
  formFileAudio!: FormGroup

  fileVideos: any = File;
  fileName!: string
  fileAudio: any = File;
  fileNameAudio!: string

  module: Module = new Module()
  isModalModule: boolean = false
  modules!: Array<Module>
  idModule: number = 1
  isVideos!: Array<FileByModule>
  isAudio!: Array<FileByModule>
  isDocx!: Array<FileByModule>
  idFileById!: number
  idFileByAudio!: number
  isModal: boolean = false
  isModalAudio: boolean = false
  isDisable: boolean = false
  urlStreaming = environment.backEndHost + "/api/streaming_videos/"
  constructor(private fb: FormBuilder, private seviceAdmin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.formFile = this.fb.group({
      file: this.fb.control("", [Validators.required])
    });
    this.formFileAudio = this.fb.group({
      fileAudio: this.fb.control("", [Validators.required])
    })
    this.getListModul();
    this.getListFileByModule()
  }
  handleModule() {
    if (this.formModule.valid) {
      this.module = this.formModule.value
      this.seviceAdmin.createModule(this.module).subscribe({
        next: (data) => {
          this.formModule.reset(0)
          this.router.navigateByUrl("/admin/create_module")
        }, error: (err) => {
          if (err.status == 403) {
            window.localStorage.clear()
            window.location.reload()
          }
        }
      })
    }
  }
  getListModul() {
    this.seviceAdmin.listModule().subscribe({
      next: (data) => {
        this.modules = data
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  selectModule(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.idModule = parseInt(value);
    this.getListFileByModule()

  }
  getListFileByModule() {
    this.seviceAdmin.getListFileByModule(this.idModule).subscribe({
      next: (data) => {
        this.isVideos = data.filter((res) => {
          return res.type == "video"
        });
        this.isAudio = data.filter((res) => {
          return res.type == "audio"
        });
        this.isDocx = data.filter((res) => {
          return res.type == "document"
        });

      }, error: (err) => {
        console.log(err.message)
      }
    })
  }
  /*_____modification
                      videos________*/

  openModalModifierVideos(idFileById: number) {
    this.isModal = true
    this.idFileById = idFileById
    this.isDisable = true
  }
  annullerModifier() {
    this.isModal = false
    this.isDisable = false
    this.formFile.reset(0)
  }
  /*_____Selectio de fichier_____*/
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileVideos = file[0];
    this.fileName = file[0].name

  }
  modifierFile() {
    if (this.formFile.valid) {
      const formData = new FormData()
      formData.append("files", this.fileVideos, this.fileName);
      this.seviceAdmin.uploadeFile(formData, this.idFileById).subscribe({
        next: (data) => {
          console.log(data);
          this.isDisable = false
          this.isModal = false
          this.formFile.reset(0)
          this.getListFileByModule()
        }, error: (err) => {
          console.log(err)
          this.isModal = false
          this.isDisable = false
          this.formFile.reset(0)
          this.getListFileByModule()
        }
      })
    }
  }
  /*_____modification
                      audios________*/

  annullerModificationAudio() {
    this.isModalAudio = false
    this.isDisable = false
    this.formFileAudio.reset(0)
  }
  openModalAudio(idFile: number) {
    this.idFileByAudio = idFile
    this.isModalAudio = true
    this.isDisable = true
  }

  onSelectFileAudio(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileAudio = file[0];
    this.fileNameAudio = file[0].name

  }
  modifierFileAudio() {
    if (this.formFileAudio.valid) {
      const formDataAudio = new FormData()
      formDataAudio.append("files", this.fileAudio, this.fileNameAudio);
      this.seviceAdmin.uploadeFile(formDataAudio, this.idFileByAudio).subscribe({
        next: (data) => {
          console.log(data);
          this.isDisable = false
          this.isModalAudio = false
          this.formFileAudio.reset(0)
          this.getListFileByModule()
        }, error: (err) => {
          console.log(err)
          this.isModalAudio = false
          this.isDisable = false
          this.formFileAudio.reset(0)
          this.getListFileByModule()
        }
      })

    }
  }

  /*_____modification
                      audios________*/
  telechargerDoc(idModule: number, fileName: string) {
    alert("salut")
    this.seviceAdmin.telechargerDoc(idModule).subscribe({
      next: (data) => {
        console.log(data)
        let blob: Blob = data.body as Blob
        let a = document.createElement('a');
        //let dernierPointIndex = fileName.lastIndexOf('.');
        let vraisrMot = fileName.split('.');
        console.log(vraisrMot)

        a.download = vraisrMot[0];
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }

}
