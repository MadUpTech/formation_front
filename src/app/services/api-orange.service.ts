import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiOrangeService {
  apiUrl = 'https://api.orange.com/oauth/v3/token';

  constructor(private http: HttpClient) { }
  /** 
   "merchant_key" :"",
            "currency": "MGA",
            "order_id":"OM",
            "amount": 2000,
           "return_url":"https://www.emediaplace.com/?ang=en",
            "cancel_url":"https://www.emediaplace.com/?ng=en",
            "notif_url":"https://www.emediaplace.com/?ng=en",
            "lang": "fr"
  */


  public getTocken(): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic RlhhMEJhOEVBZWtoQVVoSUFvV1hUcEpLdTNPRzBFSGU6NnZveE94R01uZ1VhenpPRw==',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');
    return this.http.post<string>(this.apiUrl, body, { headers: headers });
  }


  public getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic Z2UyODQ4aWVFTHB5Y1BQeWtpYnh2QjBBeUNUY3IzUHE6WDJFQUE2WFdpZ0ViVU84MA==',
      'Accept': 'application/json'
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials');

    return this.http.post<any>(this.apiUrl, body.toString(), { headers, observe: 'response' });
  }
}
