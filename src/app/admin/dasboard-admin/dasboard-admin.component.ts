import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from '../modele-admin/module.model';

@Component({
  selector: 'app-dasboard-admin',
  templateUrl: './dasboard-admin.component.html',
  styleUrls: ['./dasboard-admin.component.scss']
})
export class DasboardAdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  userList!: Array<User>
  lengthModule!: number;
  lengthClient!: number;

  ngOnInit(): void {
    this.getNouveauClient()
    this.getListmodule()
  }
  isTest() {
    this.adminService.getToken().subscribe({
      next: (data) => {
        console.log(data)
        //console.log(data.access_token)
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  getNouveauClient() {

    this.adminService.getListClient().subscribe({
      next: (data) => {
        this.lengthClient = data.filter((res) => {
          return res.role == "CLIENT";
        }).length;
        this.userList = data.filter((res) => {
          return res.payer == 0 && res.role == "CLIENT";
        })
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  getListmodule() {
    this.adminService.listModule().subscribe({
      next: (data) => {
        this.lengthModule = data.length
      }, error: (err) => {
        console.log(err)
      }
    })
  }

}
