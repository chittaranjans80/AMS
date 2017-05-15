import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { HelperService } from '../../providers/helper-service';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;	
  constructor(public navCtrl: NavController,
			  private loginService: LoginService,
			  private helperService: HelperService) {
  }

  checkAuth(form: any) {
	let username = form.username;
	let password = form.password;
	if(username && password) {
	  this.loginService.checkAuth(username, password)
	  .subscribe(loginStatus => {
		if (loginStatus == true) {
			this.navCtrl.setRoot(HomePage);
		} 
	  })
	} else {
	  this.helperService.showAlert('Invalid Login', 'Please enter valid username and password!' )
	}
  }

}
