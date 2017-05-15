import { Injectable } from '@angular/core';
import { AlertController, LoadingController} from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class HelperService {
  
  access_token: string;
  static loader: any;
  fetchTokenUrl = 'http://192.168.4.70/ams-dev/index.php/asset_api/get_token';
  logoutUrl = 'http://192.168.4.70/ams-dev/index.php/asset_api/logout';

  constructor(private alertCtrl: AlertController, 
  			      private loadingCtrl: LoadingController,
  			      private http: Http) {
  }

  showLoadingIcon() {
    HelperService.loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    HelperService.loader.present();
  }
  
  showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  setAccessToken(token: string) {
  	if(token) {
  		this.access_token = token;
  	} else {
  		this.http.request(this.fetchTokenUrl)
        .subscribe(token => {
          this.access_token = token.json();
        }, (err) => {
          console.log("Error in fetching the access token "+ JSON.stringify(err));
        });
  	}
  }

  getAccessToken(): string {
	  return this.access_token;
  }

  userLogout() {
    return this.http.request(this.logoutUrl)
    .map((res: Response) => res.json())
    .catch((error: Response| any) => Observable.throw(error.json().error) || 'server error')
  }

}
