import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { Auth } from '../providers/auth';
import { DataTabs } from '../providers/datatabs';
import { Getlocation } from '../providers/getlocation';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HTTP } from '@ionic-native/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';

import { PageService } from "../providers/pageservice";
import { Connectivity } from "../providers/connectivity-service";
import { GoogleMaps } from "../providers/google-maps";
import { InAppBrowser } from 'ionic-native';
import { OneSignal } from '@ionic-native/onesignal';
import { RoomTypesService } from "../providers/room_types_service";
 

import { HotelsListService } from "../providers/hotels_list_service";
import { RoomNumberService } from "../providers/room_number_service";
import { RoomReservationService } from "../providers/reservations_service";
import { InsertReservationService } from "../providers/insert_reservation_service";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { IonicImageViewerModule } from 'ionic-img-viewer';
 
@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'back',
      iconMode: 'ios',
      tabsPlacement: 'bottom',
      pageTransition: 'wp-transition'
    }),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    LaunchNavigator,
    HTTP,
    NativeStorage,
    Auth,
    DataTabs,
    Getlocation,
    Camera,
    File,
    FilePath,
    Transfer,
    BackgroundGeolocation,
    Geolocation,
    Diagnostic,
    OneSignal,
    Connectivity,
    RoomTypesService,
    HotelsListService,
    RoomNumberService,
    RoomReservationService,
    InsertReservationService,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
