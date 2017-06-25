import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-welcome-before-login',
  templateUrl: 'welcome-before-login.html',
})
export class WelcomeBeforeLogin {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController ,public navParams: NavParams, public alertCtrl: AlertController) {
       this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeBeforeLogin');
  }

   login() {
    this.navCtrl.push('Login');
  }

  register() {
  this.chooseRegisterType();
  }
goToAboutapp(){
  this.navCtrl.push('About');
}

chooseRegisterType() {
    let alert = this.alertCtrl.create();
    
    alert.setTitle('Register as');

    alert.addInput({
      type: 'radio',
      label: 'Individual user',
      value: 'individual',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Corporate user',
      value: 'corporate',
      
    });

     alert.addInput({
      type: 'radio',
      label: 'Institutional user',
      value: 'institutional',
      
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        if(data=='individual')
          {
            console.log(data);
            this.navCtrl.push("RegisterPage", {right:0});
          }
          else if(data=='corporate')
            {
              console.log(data);
              this.navCtrl.push("Googleregister", {right:1});
            }
             else if(data=='institutional')
            {
              console.log(data);
              this.navCtrl.push("Googleregister", {right:2});
            }
       // this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;

      }
    });
    alert.present();
    
  }
}


