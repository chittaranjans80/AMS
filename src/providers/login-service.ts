import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HelperService} from './helper-service';

@Injectable()
export class LoginService {
  loginAPIUrl = 'http://192.168.4.70/ams-dev/index.php/asset_api/user_login';

  constructor(private http: Http,
              private helperService: HelperService) {
  }

  checkAuth(username: string, password: string): Observable<any> {
    this.helperService.showLoadingIcon();
    let credential = "username=" + username + "&password=" + password;
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    console.log("login url "+ this.loginAPIUrl + " credential "+ credential + " headers " +JSON.stringify(headers));
    return this.http.post(this.loginAPIUrl, credential, {
      headers: headers
    })
    .map((res: Response) => {
      let response = res.json();
      HelperService.loader.dismiss();
      console.log("response found "+ JSON.stringify(response));
      if (response.status == true) {
        this.helperService.setAccessToken(response.access_token);
      } else {
        this.helperService.showAlert('Invalid Login', response.errors);
      }
      return response.status;
    })
    .catch((error: Response| any)=>{
      console.log("Inside catch block");
      HelperService.loader.dismiss();
      this.helperService.showAlert('Invalid Login', error.json());
      return Observable.throw(error.json().error) || 'server error'
    });
  }

}
