import { Component, OnInit } from '@angular/core';
import { User } from '../modele-admin/module.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  userList!: Array<User>
  user!: User
  inputRechercher!: string
  totalPageItems: any;
  page: number = 1;
  isChecked: boolean = true;
  isCheckedPayer: boolean = false;
  isCheckedNoPayer: boolean = false;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getListUser();
  }

  onCheckBoxChangeTous() {
    // Cette fonction sera appelée lorsque l'état de la case à cocher change
    if (this.isChecked) {
      console.log('La case à cocher est cochée.');
      // Faire quelque chose lorsque la case est cochée
    } else {
      console.log('La case à cocher n\'est pas cochée.');
      // Faire quelque chose lorsque la case n'est pas cochée
    }
  }
  getListUser() {
    this.adminService.getListClient().subscribe({
      next: (data) => {
        this.userList = data
        //console.log(data)
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
  }
  getKeyUpUtilisateur(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.inputRechercher = value
    this.adminService.getListClient().subscribe({
      next: (data) => {
        this.userList = data.filter((res) => {
          return res.nom!.toLowerCase().includes(this.inputRechercher.toLowerCase());
        });
      }, error: (err) => {
        if (err.status == 401 || err.status == 403) {
          window.localStorage.clear();
          window.location.reload()
        }
      }
    })
    /*
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res) => {
            return res.mois == this.moi && res.user.nom.toLowerCase().includes(this.inputRechercher.toLowerCase()) && res.annee == this.annee
          })         

        }
      }
    )*/
  }
  modifierStatusUser(idClient: string) {
    this.adminService.modifierStatus(idClient).subscribe({
      next: (data) => {
        this.user = data
        this.getListUser()
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  supprimer(idClient: string) {
    alert(idClient)
    this.adminService.supprimerClient(idClient).subscribe({
      next: (data) => {
        console.log(data)
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  isPayement(id: string) {
    this.adminService.isPayement(id).subscribe({
      next: (data) => {
        this.getListUser();
      }, error: (err) => {
        console.log(err);
      }
    })
  }

}
