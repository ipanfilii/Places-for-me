import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera,  } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-facult-home',
  templateUrl: 'facult-home.html',
})
export class FacultHome {

 lastImage: string = null;
  loading: Loading;
  myForm:any;
  posts:any;
  image:any;
  postParamss:any;
  iddd:any;
  id:Array<{title: string, text: string, icon: string,id:string}>=[{title:'',text:'',icon:'',id:''}];
  idd:any; //parametru inserare 
  facultate:any; // parametru trasnmis de la viewac pt inserare
  public tabBar:any;
  constructor(
    public camera: Camera,
    public file: File,
    public filePath: FilePath,
    public transfer: Transfer,
    public http: Http,
    public viewCtrl: ViewController, 
    private formBuilder: FormBuilder ,
    public navCtrl: NavController, 
    public navParams: NavParams,
  	public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController) {
      
      this.myForm = this.formBuilder.group({
          text: [''],
          title: [''],
          nothing:['']
      });
      if(navParams.get('id')){
        this.id.pop();
           this.iddd = navParams.get('id');
           console.log(this.iddd.title)
           this.id.push({
             title:this.iddd.title,
             text:this.iddd.text,
             icon:this.iddd.icon,
             id:this.iddd.id
           })
      }
      else {
        
      }
      console.log(this.id[0].title)
      this.idd = navParams.get('idd');
      this.facultate = navParams.get('facultate');
  }
 
  logForm() {
    localStorage.setItem('text',this.myForm._value.text);
    if(this.idd===1){ 
      let headers = new Headers();
      headers.append("Accept",'application/json');
      headers.append('Content-Type','application/json');
      let options = new RequestOptions({headers:headers});

      let postParams = {
        inserttitle:this.myForm._value.title,
        inserttext:this.myForm._value.text,
        insertimage:localStorage.getItem('upt'),
        facultate:this.facultate
      }
      this.http.post('http://www.atestate-inf.tk/ghidtest/insert.php',JSON.stringify(postParams),options).map(res => res.json())
      .subscribe(data=>{
        console.log(data);
      },error=>{
        console.log(error);
      });
    }
    else{

       let headers = new Headers();
      headers.append("Accept",'application/json');
      headers.append('Content-Type','application/json');
      let options = new RequestOptions({headers:headers});

      console.log(this.id)
      console.log(localStorage.getItem('upt'));
//  alert(this.myForm._value.title+this.myForm._value.text+localStorage.getItem('upt')+this.id[0].id)
      if(this.myForm.value.title      && this.myForm.value.text === "" && localStorage.getItem('upt')===null){ //100
          this.myForm.value.text = this.id[0].text;
          console.log(this.id);
          localStorage.setItem('upt',this.id[0].icon);
      }
      else if(this.myForm.value.title       && this.myForm.value.text == "" && localStorage.getItem('upt')){ //101
          console.log(this.id);
          this.myForm.value.text = this.id[0].text;
      }else 
      if(this.myForm.value.title        && this.myForm.value.text         && localStorage.getItem('upt')===null){//110
          console.log(this.id);
          localStorage.setItem('upt',this.id[0].icon);
      }
      else 
      if(this.myForm.value.title        && this.myForm.value.text          && localStorage.getItem('upt')){//111
          console.log(this.id);
      }
      else
      if(this.myForm.value.title == "" && this.myForm.value.text == "" && localStorage.getItem('upt')===null){//000
          localStorage.setItem('upt',this.id[0].icon);
          this.myForm.value.text = this.id[0].text;
          this.myForm.value.title = this.id[0].title;
          console.log(this.id);
      }
      else
      if(this.myForm.value.title == "" && this.myForm.value.text == "" && localStorage.getItem('upt')){//001
          this.myForm.value.title = this.id[0].title;
          this.myForm.value.text = this.id[0].text;
          console.log(this.id);
      }        
      else 
      if(this.myForm.value.title == "" && this.myForm.value.text         && localStorage.getItem('upt')===null){//010
          this.myForm.value.title = this.id[0].title;
          localStorage.setItem('upt',this.id[0].icon);
          console.log(this.id);
      }
      else 
      if(this.myForm.value.title == "" && this.myForm.value.text          && localStorage.getItem('upt')){//011
          this.myForm.value.title = this.id[0].title;
          console.log(this.id);

      }
console.log(this.myForm)
      this.postParamss = {
        inputtitle:this.myForm.value.title+" ",
        inputtext:this.myForm.value.text+" ",
        inputimage:localStorage.getItem('upt'),
        id:this.id[0].id
      }
      this.http.post('http://www.atestate-inf.tk/ghidtest/edit.php',JSON.stringify(this.postParamss),options)
      .subscribe(data=>{
        console.log(data);
      },error=>{
        console.log(error);
      });

    
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LigaacPage');
  }


navigateToSecondPage() {
    this.navCtrl.pop();
  }
  public takePicture(sourceType) {
  // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
  
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast(err);
    });
} 

private createFileName() {
    var d = new Date(),
    n = d.getDay()+d.getHours()+d.getSeconds()+d.getSeconds(),
    newFileName =  n + ".jpg";
    
    localStorage.setItem('upt',newFileName);
    return newFileName;
  }
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast(error);
  });
}

 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}


 public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
  public uploadImage() {
    this.id[0].icon = localStorage.getItem('upt');
 
  // Destination URL
  var url = "http://www.atestate-inf.tk/ghidtest/upload.php";
 //http://atestate-inf.tk/ghidtest/upload.php
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast(err);
  });
}
}