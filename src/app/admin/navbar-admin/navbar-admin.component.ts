import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  urlImage!: string

  constructor(public authService: AuthentificationService) {
    this.urlImage = environment.backEndHost + "/api/telechargerImage/" + this.authService.id
  }

  ngOnInit(): void {
  }

}
