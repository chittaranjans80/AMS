import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AssetInfo } from '../data-model/asset-info-model';
import { Observable} from 'rxjs/Rx';
import { HelperService} from './helper-service';


@Injectable()
export class AssetInfoService {
  getAssetDetailsUrl = "http://192.168.4.70/ams-dev/index.php/asset_api/get_asset_details/?";
  updateAssetInfoUrl = "http://192.168.4.70/ams-dev/index.php/asset_api/update_item";
	assetInfo : AssetInfo;

  constructor(public http: Http,
              private helperService: HelperService) {
  }

  setAssetInfo(assetInfo) {
  	this.assetInfo = assetInfo;
  }

  getAssetInfo() {
  	return this.assetInfo;
  }

  fetchAssetDetails(assetId: string, access_token: string) {
    this.helperService.showLoadingIcon();
    let assetParams = "asset_id=" + assetId + "&access_token=" + access_token;
    let requestUrl = this.getAssetDetailsUrl + assetParams;
    console.log("requestedUrl is" + requestUrl);

    return this.http.request(requestUrl)
    .map((res: Response) => {
      let response = res.json();
      this.setAssetInfo(res.json());
      HelperService.loader.dismiss();
      return response;
    })
    .catch((error: Response | any) => {
      this.helperService.showAlert('Invalid request', error.json());
      return Observable.throw(error.json().error) || 'server error'
    })
  }

  updateAssetDetails(assetId: string, locationId: string, issuedTo: string) {
    this.helperService.showLoadingIcon();
    let access_token = this.helperService.getAccessToken();
    let credential = "asset_id=" + assetId + "&access_token=" + access_token
                     + "&location_id=" + locationId
                     + "&item_general_checked_out_to=" + issuedTo;
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    console.log("Url is " + this.updateAssetInfoUrl +" and credential is "+ credential);

    return this.http.post(this.updateAssetInfoUrl, credential, {
      headers: headers
    })
    .map((res: Response) => {
      let response = res.json();
      HelperService.loader.dismiss();
      this.helperService.showAlert('Update success', 'Asset Info updated successfully');
      return response.status;
    })
    .catch((error: Response| any)=>{
      HelperService.loader.dismiss();
      this.helperService.showAlert('Invalid request', error.json());
      return Observable.throw(error.json().error) || 'server error';
    });
  }

}
