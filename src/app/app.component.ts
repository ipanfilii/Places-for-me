import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = "Welcome";
  public dataUser: any = [];
  pages: Array<{icon:string, title: string, component: any}>;

  constructor(public loadCtrl: LoadingController, public auth: Auth, public platform: Platform, private nativeStorage: NativeStorage, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    let load = this.loadCtrl.create({
        content: "Data is loading...",
    });
    this.auth.login().then( (isLoggedIn) => {
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
      } else  if( this.dataUser.right == 1 ) {
          this.rootPage = 'HomePage';
          this.pages = [
            { icon:'home', title: 'Home', component: "HomePage" },
            { icon:'contact', title: 'Profilul meu', component: "Profile" },
            { icon:'school', title: 'Facultati', component: "Facultati" },  
            { icon:'map', title: 'Harta Campusului', component: "Googlemaps" },
            { icon:'log-in', title: 'Autentificare', component: "Login" },
            { icon:'log-in', title: 'Iesire', component: "Logout" }
          ];
      } else {
          this.rootPage = 'Welcome';
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

  }


  initializeApp() {

    this.platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
