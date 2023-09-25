import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/admin/modele-admin/module.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isModal: boolean = false;
  id = "salut"
  urlImage!: string
  modules!: Array<Module>
  constructor(private router: Router, public authService: AuthentificationService, private adminService: AdminService) {
    this.urlImage = environment.backEndHost + "/api/telechargerImage/" + this.authService.id
  }

  ngOnInit(): void {
    this.getisteModule()
  }
  openModal() {
    this.isModal = !this.isModal
  }
  logaout() {
    window.localStorage.clear()
    window.location.reload()
  }

  getisteModule() {
    this.adminService.getListModuleByClient(this.authService.id).subscribe({
      next: (data) => {
        this.modules = data
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  moduleSuivant(code: number) {
    window.localStorage.setItem("isMod", code.toString());

    this.router.navigateByUrl("/client");
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }


}
