import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the WelcomeBeforeLogin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome-before-login',
  templateUrl: 'welcome-before-login.html',
})
export class WelcomeBeforeLogin {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController ,public navParams: NavParams) {
       this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeBeforeLogin');
  }

   login() {
    this.navCtrl.push('Login');
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }
goToAboutapp(){
  this.navCtrl.push('Aboutapp');
}

}
