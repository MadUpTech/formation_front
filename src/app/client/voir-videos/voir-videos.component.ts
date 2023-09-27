import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileByModule } from 'src/app/admin/modele-admin/module.model';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-voir-videos',
  templateUrl: './voir-videos.component.html',
  styleUrls: ['./voir-videos.component.scss']
})
export class VoirVideosComponent implements OnInit {
  idModule!: number
  urlStreaming = environment.backEndHost + "/api/streaming_videos/"
  idVideo!: string;
  fileModule!: FileByModule
  nomFile!: string
  listVideos!: Array<FileByModule>
  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) {
    this.idModule = parseInt(this.route.snapshot.queryParamMap.get('id')!);
  }

  ngOnInit(): void {
    this.getIdVideo()
  }
  getIdVideo() {
    let id = window.localStorage.getItem('fileIsFile');
    this.idVideo = id!;
    this.getListesVideos()
    this.adminService.getFileByModule(parseInt(id!)).subscribe({
      next: (data) => {
        this.nomFile = data.fileName!
        console.log(this.nomFile)
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  getListesVideos() {
    let idMod = window.localStorage.getItem('fileIsFile')
    this.adminService.getListFileByModule(this.idModule).subscribe({
      next: (data) => {
        this.listVideos = data.filter((res) => {
          return res.type == 'video' && res.id != parseInt(idMod!)
        });
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
  }
  voirVideo(id: number, ext: string) {
    window.localStorage.setItem("fileIsFile", id.toString() + ext)
    this.getIdVideo()
    window.location.reload()
  }
}
