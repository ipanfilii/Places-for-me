import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {
  slides = [
    {
      title: "Welcome to Places for me",
      description: "The <b>Places for me </b>app is the best solution for using your time eficiently .",
      image: "assets/icon.png",
    },
    {
      title: "What is Places for me?",
      description: "<b>Places for me</b> is the best solution if you are in your city or even you are traveling. <br>It helps you to decide where to stay, eat, work and entertain. <br>So it's your virtual best friend. ",
      image: "assets/icon.png",
    },
   
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }
 public goToWelcome() {
  this.navCtrl.setRoot('WelcomeBeforeLogin');
}
}
