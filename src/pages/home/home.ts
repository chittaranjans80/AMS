import { Component } from '@angular/core';
import { BarcodeScanner} from 'ionic-native';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { AssetDetailsPage } from '../asset-details/asset-details';
import { AssetInfoService } from '../../providers/asset-info-service';
import { HelperService } from '../../providers/helper-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private http: Http, 
              public navCtrl: NavController,
              private assetInfoService: AssetInfoService, 
              private helperService: HelperService) {
  }

  startScanning() {
	  BarcodeScanner.scan().then((result) => {
  		if (!result.cancelled) {
        let assetId: string = result.text;
        let access_token = this.helperService.getAccessToken();
  			this.assetInfoService.fetchAssetDetails(assetId, access_token)
        .subscribe((result) => {
        if(result.item_asset_number) {
          this.navCtrl.push(AssetDetailsPage);
        } else {
          this.helperService.showAlert('No result', 'Asset details not found');
        }

        });
  		}
  	}).catch((err) => {
        this.helperService.showAlert('Invalid request', err.json());
  	})
  }

  userLogout() {
     this.helperService.userLogout().subscribe(response => {
        console.log("User Logged out successfully");
        this.navCtrl.setRoot(LoginPage);
     });
  }

}
