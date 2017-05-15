import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AssetInfo } from '../../data-model/asset-info-model';
import { AssetInfoService } from '../../providers/asset-info-service';

@Component({
  selector: 'page-asset-details',
  templateUrl: 'asset-details.html'
})
export class AssetDetailsPage implements OnInit {
  assetInfo: AssetInfo;
  locationList: any[];

  constructor(public navCtrl: NavController, 
              private assetInfoService: AssetInfoService) {
  }

  updateAssetInfo() {
    let locationId = this.assetInfo.location_id;
    let issuedTo = this.assetInfo.item_general_checked_out_to;
    let assetId = this.assetInfo.item_asset_number;
    this.assetInfoService.updateAssetDetails(assetId, locationId, issuedTo)
    .subscribe(() => this.navCtrl.popToRoot());
  }

  ngOnInit() {
    this.assetInfo =  this.assetInfoService.getAssetInfo();
    this.locationList = this.assetInfo.locations_names;
  }

}
