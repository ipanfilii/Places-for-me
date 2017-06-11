import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';


@Injectable()
export class Auth {
  public userData: any = [];
  public user: any;
  constructor(public http: Http,
              public platform: Platform,
              public nativeStorage: NativeStorage) {
      this.user = localStorage.getItem('user');
  }

  login() {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    return new Promise((resolve) => {
    this.http.get('http://192.168.43.95/login.php?user='+this.user).map(res => res.json()).subscribe(data => {

        this.userData = data;
        // localStorage.setItem('user', this.userData.username);
       resolve(this.userData);    
      });
    });
  }

}
