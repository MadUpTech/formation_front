import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DasboardAdminComponent } from './admin/dasboard-admin/dasboard-admin.component';
import { ValidationExamenComponent } from './admin/validation-examen/validation-examen.component';
import { AuthorizationisGuard } from './guards/authorizationis.guard';
import { DasboardComponent } from './client/dasboard/dasboard.component';
import { CreateModuleComponent } from './admin/create-module/create-module.component';
import { AuthorisationGuard } from './guards/authorisation.guard';
import { AuthorizationClientGuard } from './guards/authorization-client.guard';
import { ModuleClientComponent } from './client/module-client/module-client.component';
import { AppAdminComponent } from './admin/app-admin/app-admin.component';
import { ProfileComponent } from './client/profile/profile.component';
import { ModuleComponent } from './admin/module/module.component';
import { VoirVideosComponent } from './client/voir-videos/voir-videos.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { DetailExamenComponent } from './admin/detail-examen/detail-examen.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { CertifierComponent } from './admin/certifier/certifier.component';

const routes: Routes = [
  { path: "", redirectTo: "/connexion", pathMatch: "full" },
  { path: "test", component: TestComponent },
  { path: "connexion", component: LoginComponent },
  { path: "inscription", component: InscriptionComponent },
  /* _____________page______________________admin____________________ */
  {
    path: "admin", component: AppAdminComponent, canActivate: [AuthorizationisGuard], children: [
      { path: "", component: DasboardAdminComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } },
      { path: "validation", component: ValidationExamenComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } },
      { path: "create_module", component: CreateModuleComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } },
      { path: "module", component: ModuleComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } },
      { path: "profile", component: ProfileAdminComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } },
      { path: "detail", component: DetailExamenComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } },
      { path: "utilisateur", component: UtilisateurComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } },
      { path: "certifier", component: CertifierComponent, canActivate: [AuthorisationGuard], data: { role: "ROLE_ADMIN" } }
    ]
  },
  /* _____________page______________________client___________________ */
  {
    path: "client", component: DasboardComponent, canActivate: [AuthorizationisGuard], children: [
      { path: "", component: ModuleClientComponent, canActivate: [AuthorizationClientGuard], data: { role: "ROLE_CLIENT" } },
      { path: "profile", component: ProfileComponent, canActivate: [AuthorizationClientGuard], data: { role: "ROLE_CLIENT" } },
      { path: "videos", component: VoirVideosComponent, canActivate: [AuthorizationClientGuard], data: { role: "ROLE_CLIENT" } },
      //{ path: "videos/:id", component: VoirVideosComponent, canActivate: [AuthorizationClientGuard], data: { role: "ROLE_CLIENT" } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
