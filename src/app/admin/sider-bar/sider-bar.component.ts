import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.scss']
})
export class SiderBarComponent implements OnInit {
  isNav: boolean = false

  constructor() { }

  ngOnInit(): void {
  }
  openNav() {
    this.isNav = !this.isNav
  }
  fermeNav() {
    this.isNav = false
  }

  logaoutAdmin() {
    window.localStorage.clear()
    window.location.reload()
  }
}
