import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../providers/auth';
import { HomePage } from "../pages/home/home";
import { Informatii } from "../pages/informatii/informatii";
import { Welcome } from "../pages/welcome/welcome";
import { WelcomeBeforeLogin } from "../pages/welcome-before-login/welcome-before-login";
import { Getlocation } from '../providers/getlocation';
import { OneSignal } from "@ionic-native/onesignal";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

   rootPage: any = "WelcomeBeforeLogin";
  public dataUser: any = [];
  pages: Array<{icon:string, title: string, component: any}>;

  constructor(private  oneSignal: OneSignal, public loadCtrl: LoadingController, public getlocation: Getlocation, public auth: Auth, public platform: Platform, private nativeStorage: NativeStorage, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    let load = this.loadCtrl.create({
        content: "Data is loading...",
    });

    this.rootPage = "WelcomeBeforeLogin";

    this.auth.login().then( (isLoggedIn) => {
      load.dismiss();
      this.dataUser = isLoggedIn;
      console.log(this.dataUser);
      if( this.dataUser.success == true ) {//daca e logare cu succes--->afterLogin
          this.rootPage = 'WelcomeAfterLogin';
          this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-in', title: 'Iesire', component: "Logout" },
          ];
      }  else {///daca e guest
          this.rootPage = 'WelcomeBeforeLogin';
          this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },     
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-out', title: 'Iesire', component: "Logout" },
          ];
      }
       this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-in', title: 'Iesire', component: "Logout" },
          ];
    })

   /* this.auth.login().then( (isLoggedIn) => {
      load.dismiss();
      this.dataUser = isLoggedIn;
      console.log(this.dataUser)
      if( this.dataUser.right == 0 ) {
          this.rootPage = 'HomePage';
          this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-in', title: 'Iesire', component: "Logout" },
          ];
      }  else {
          this.rootPage = 'WelcomeBeforeLogin';
          this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },     
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-out', title: 'Iesire', component: "Logout" },
          ];
      }
       this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-in', title: 'Iesire', component: "Logout" },
          ];
    })*/

    
  this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-in', title: 'Iesire', component: "Logout" },
          ];

  }


  initializeApp() {

    this.platform.ready().then(() => {
     this.getlocation.startTracking();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.oneSignal.startInit("a0bfcab0-43b0-456e-a62d-48c86af5202a", "791062974267");
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.setSubscription(true);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when the notification is received.
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when the notification is opened.
      this.rootPage = 'Facultati';
      });
      this.oneSignal.endInit();
      this.oneSignal.getIds().then(data => {
      // this gives you back the new userId and pushToken associated with the device. Helpful.
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
