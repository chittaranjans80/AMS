import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AssetDetailsPage } from '../pages/asset-details/asset-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HelperService } from '../providers/helper-service';
import { LoginService} from '../providers/login-service';
import { AssetInfoService } from '../providers/asset-info-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AssetDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AssetDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HelperService,
    LoginService,
    AssetInfoService
  ]
})
export class AppModule {}
