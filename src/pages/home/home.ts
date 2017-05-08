import { Component } from '@angular/core';
import { IonicPage, ToastController, Platform, MenuController} from 'ionic-angular';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public informatii: string = "Informatii";
  public about: string = "About";
  public beneficii: string = "Beneficii";
  public user: string;
  constructor(private network: Network, 
              private toastCtrl: ToastController,
              public platform: Platform,
              public menuCtrl: MenuController
             ) {
              this.platform.ready().then(() => {
                    this.menuCtrl.enable(true);
              });

  }

   /**
  * 
  * @param connectionState 
  */
  displayNetowrk(connectionState: string) {
    let networkType = this.network.type;
    if(networkType === 'none') {
        this.toastCtrl.create({
          message: 'You are now '+connectionState,
          duration:5000
        }).present();
  } else {
      this.toastCtrl.create({
          message: 'You are now '+connectionState+' via '+networkType,
          duration:5000
        }).present();
    }
  }

  /**
   * check if you have netowrk connection
   */
   ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      this.displayNetowrk(data.type);}
      , error => console.log(error));

    this.network.onDisconnect().subscribe(data => {
        this.displayNetowrk(data.type);}
      , error => console.log(error)
    );
  }
}
