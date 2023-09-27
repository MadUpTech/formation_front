import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiOrangeService } from '../services/api-orange.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  loader = false;
  isChecked: boolean = false;
  customOptionss: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000, // Définissez votre délai entre les images
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  };
  customOptions: OwlOptions = {
    loop: true, // Carrousel infini
    margin: 0, // Marge entre les éléments
    items: 1, // Nombre d'éléments à afficher à la fois
    autoplay: true, // Activer le défilement automatique
    autoplayTimeout: 3000, // Temps en millisecondes entre les changements d'image (3 secondes)
  };

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private apiService: ApiOrangeService, private adminService: AdminService) { }


  ngOnInit(): void {

  }
  getTocken() {
    this.apiService.getAccessToken().subscribe({
      next: (data) => {
        console.log(data)
      }, error: (err) => {
      }
    })
  }

  test() {
    const apiUrl = 'https://api.orange.com/oauth/v3/token';
    const consumerKey = 'Z2UyODQ4aWVFTHB5Y1BQeWtpYnh2QjBBeUNUY3IzUHE6WDJFQUE2WFdpZ0ViVU84MA=='; // Remplacez par votre véritable clé consommateur

    // Créez les en-têtes HTTP requis
    const headers = new HttpHeaders({
      'Authorization': `Basic ${consumerKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    // Créez les données à envoyer
    const data = 'grant_type=client_credentials';

    // Effectuez la requête POST
    this.httpClient.post(apiUrl, data, { headers: headers })
      .subscribe((response) => {
        console.log('Réponse de la requête :', response);
        // Vous pouvez gérer la réponse ici
      }, (error) => {
        console.error('Erreur lors de la requête :', error);
        // Gérez les erreurs ici
      });
  }
  isTest() {
    this.adminService.getToken().subscribe({
      next: (data) => {
        console.log(data)
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  onCheckBoxChange() {
    // Cette fonction sera appelée lorsque l'état de la case à cocher change
    if (this.isChecked) {
      console.log('La case à cocher est cochée.');
      // Faire quelque chose lorsque la case est cochée
    } else {
      console.log('La case à cocher n\'est pas cochée.');
      // Faire quelque chose lorsque la case n'est pas cochée
    }
  }




}
