import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Informatii page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-informatii',
  templateUrl: 'informatii.html',
})
export class Informatii {
  public title: string[] = [];
  public content: string[] = [];
  public imageLink: string[] = [];
  public typeOfPage: number[] = []; // 1 - list page or 2 -content page
  public items: Array<{title: string, content: string, imageLink: string, typeOfPage: number}>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
                this.title = ['Informatii ', 'Informatii' ,'Informatii ', 'Informatii'];
                this.content = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, 

                `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

                  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                 
                 
                  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`  ];
                this.imageLink = ['http://placehold.it/500x300', 'http://placehold.it/500x300', 'http://placehold.it/500x300', 'http://placehold.it/500x300'];
                this.typeOfPage = [0, 1,0];

                this.items = [];
                for(let i = 0; i < this.title.length; i++) {
                  this.items.push({
                    title: this.title[i] + i,
                    content: this.content[i],
                    imageLink: this.imageLink[i],
                    typeOfPage:this.typeOfPage[i]
                  });
                }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Informatii');
  }

}
