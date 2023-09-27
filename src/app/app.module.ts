import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppAuthInterceptor } from './interceptors/app-auth.interceptor';
import { DasboardComponent } from './client/dasboard/dasboard.component';
import { DasboardAdminComponent } from './admin/dasboard-admin/dasboard-admin.component';
import { ModuleAdminComponent } from './admin/module-admin/module-admin.component';
import { ValidationExamenComponent } from './admin/validation-examen/validation-examen.component';
import { CreateModuleComponent } from './admin/create-module/create-module.component';
import { ProfileComponent } from './client/profile/profile.component';
import { NavbarComponent } from './client/navbar/navbar.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { SiderBarComponent } from './admin/sider-bar/sider-bar.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { ModuleClientComponent } from './client/module-client/module-client.component';
import { AppAdminComponent } from './admin/app-admin/app-admin.component';
import { ModuleComponent } from './admin/module/module.component';
import { VoirVideosComponent } from './client/voir-videos/voir-videos.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play'
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { DetailExamenComponent } from './admin/detail-examen/detail-examen.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CertifierComponent } from './admin/certifier/certifier.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    InscriptionComponent,
    DasboardComponent,
    DasboardAdminComponent,
    ModuleAdminComponent,
    ValidationExamenComponent,
    CreateModuleComponent,
    ProfileComponent,
    NavbarComponent,
    NavbarAdminComponent,
    SiderBarComponent,
    UtilisateurComponent,
    ModuleClientComponent,
    AppAdminComponent,
    ModuleComponent,
    VoirVideosComponent,
    ProfileAdminComponent,
    DetailExamenComponent,
    CertifierComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgBufferingModule,
    VgControlsModule,
    VgOverlayPlayModule,
    CarouselModule,
    FormsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
