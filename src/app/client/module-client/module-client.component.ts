import { Attribute, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorrectionList, Examen, ExamenList, FileByModule, FileByModulee, Module } from 'src/app/admin/modele-admin/module.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module-client',
  templateUrl: './module-client.component.html',
  styleUrls: ['./module-client.component.scss']
})
export class ModuleClientComponent implements OnInit {
  formFileRendre!: FormGroup
  @Input() id!: number

  fileDoc: any = File;
  fileName!: string
  idFile!: number
  examen: Examen = new Examen();
  idModal: boolean = false;
  isDocument!: Array<ExamenList>

  module: Module = new Module()
  modules!: Array<Module>
  idModule!: number
  isVideos!: Array<FileByModulee>
  isAudio!: Array<FileByModulee>
  isDoc!: Array<FileByModulee>
  urlStreaming = environment.backEndHost + "/api/streaming_videos/"
  idVideos!: string
  listCorrections!: Array<CorrectionList>


  isControl: boolean = false
  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  constructor(private serviceAthu: AuthentificationService, private adminService: AdminService, private fb: FormBuilder, private seviceAdmin: AdminService, private router: Router, private renderer: Renderer2) {
  }


  ngOnInit(): void {
    this.changeIdmodule()
    this.formFileRendre = this.fb.group({
      file: this.fb.control("", [Validators.required]),
      date: this.fb.control(new Date())
    });
    this.getListFileByModule()
    this.getListExamenByClient()
    this.getListCorrectionList()

  }

  changeIdmodule() {
    let d = window.localStorage.getItem("isMod");
    this.idModule = parseInt(d!);

  }
  moduleSuivant() {
    let modulSuivante = this.idModule + 1
    window.localStorage.setItem("isMod", modulSuivante.toString())
    this.changeIdmodule()
    this.getListFileByModule()
    this.getListExamenByClient()
    window.location.reload()
  }
  playVideo(id: number, extesion: string) {
    const videoElement: HTMLVideoElement = this.myVideo.nativeElement;
    //videoElement.append(Attribute("controls"))
    // this.isControl = true

    if (videoElement.src !== this.urlStreaming + id + extesion) {
      // Changez la source du lecteur vidéo pour le nouveau vidéo
      videoElement.src = this.urlStreaming + id + extesion
      // Chargez la nouvelle source
      videoElement.load();
    }
    videoElement.play();
  }
  pauseVideo(id: number, extesion: string) {
    const videoElement: HTMLVideoElement = this.myVideo.nativeElement;
    this.isControl = false
    if (videoElement.src === this.urlStreaming + id + extesion) {
      videoElement.pause();
    }
  }

  stopVideo() {
    // Obtenez le lecteur vidéo à partir de la référence de vue
    const player: HTMLVideoElement = this.myVideo.nativeElement;

    // Arrêtez la lecture de la vidéo
    player.pause();
    // Réinitialisez le temps de lecture
    player.currentTime = 0;
  }

  playVideos(video: any) {
    // Obtenez le lecteur vidéo à partir de la référence de vue
    const player: HTMLVideoElement = this.videoPlayer.nativeElement;


    // Vérifiez si le lecteur vidéo est déjà en cours de lecture
    if (player.src !== this.urlStreaming + video.id + video.extension) {
      // Changez la source du lecteur vidéo pour le nouveau vidéo
      player.src = video.url;
      // Chargez la nouvelle source
      player.load();
    }

    // Démarrez la lecture de la vidéo
    player.play();
  }



  voirVideo(id: number, ext: string) {
    let url: string = "/client/videos?id=" + this.idModule
    window.localStorage.setItem("fileIsFile", id.toString() + ext)
    this.router.navigateByUrl(url);
  }

  getListFileByModule() {
    this.seviceAdmin.getListFileByModule(this.idModule).subscribe({
      next: (data) => {
        this.isVideos = data.filter((res) => {
          return res.type == "video" && res.module?.id == this.idModule;
        });

        this.isAudio = data.filter((res) => {
          return res.type == "audio" && res.module?.id == this.idModule;
        });
        this.isDoc = data.filter((res) => {
          return res.type == "document" && res.module?.id == this.idModule;
        });

      }, error: (err) => {
        console.log(err.message)
      }
    })
  }
  getListExamenByClient() {
    this.seviceAdmin.getListExamenByClient(this.serviceAthu.id).subscribe({
      next: (data) => {
        this.isDocument = data.filter(res => {
          return res.idModule == this.idModule
        })
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  telechargerDoc(idModule: number, fileName: string) {
    this.seviceAdmin.telechargerDoc(idModule).subscribe({
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

  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileDoc = file[0];
    this.fileName = file[0].name

  }
  openModalRendre(idFile: number) {
    this.idModal = true;
    this.idFile = idFile;
    console.log(idFile)

  }
  annuller() {
    this.idModal = false;
    this.formFileRendre.reset(0);
  }

  rendreDoc() {
    if (this.formFileRendre.valid) {
      let data = new Examen();
      data = this.formFileRendre.value
      data.idFile = this.idFile
      data.idUser = this.serviceAthu.id
      data.status = 1;
      data.id = this.idFile
      this.adminService.saveExamen(data).subscribe({
        next: (data) => {
          const formData = new FormData()
          formData.append("files", this.fileDoc, this.fileName);
          this.adminService.uploadeFileExamen(formData, data.id!).subscribe({
            next: (data) => {
              this.formFileRendre.reset(0)
              this.idModal = false;
              this.formFileRendre.reset(0);
              this.getListExamenByClient()
            }, error: (err) => {
              console.log(err)
              this.formFileRendre.reset(0);
              this.idModal = false;
              this.getListExamenByClient();
            }
          })

        }, error: (err) => {
          console.log(err)
        }
      })

    }
  }

  getListCorrectionList() {
    this.adminService.getListCorrectionClient(this.serviceAthu.id).subscribe({
      next: (data) => {
        this.listCorrections = data.filter(res => {
          return res.examen?.idModule == this.idModule
        })
        console.log(data)
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  telechargeCorrection(id: number, fileName: string) {
    this.seviceAdmin.telechargerDocCorrection(id).subscribe({
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

}
