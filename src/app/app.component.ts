import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthentificationService) { }
  ngOnInit(): void {

    this.authService.getTokenByLocalstorage();

  }
  title = 'formation';
}
