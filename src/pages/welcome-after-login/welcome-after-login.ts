import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { PageService } from "../../providers/pageservice";

@IonicPage()
@Component({
  selector: 'page-welcome-after-login',
  templateUrl: 'welcome-after-login.html',
})
export class WelcomeAfterLogin {

  private logedUser: string = '';
 // user: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    this.logedUser = localStorage.getItem('user');
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeAfterLogin');
  }

  goToAccountManagement(){
    this.navCtrl.push('AccountManagement');
  }

goToGoogleMaps(){
  this.navCtrl.push('Googlemaps');
}

goToReviews(){
  this.navCtrl.push('Reviews');
}

goToStatistics(){
  this.navCtrl.push('Statistics');
}
  }

