import { IonicPage, NavController, Platform, AlertController, ViewController, ToastController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Getlocation } from '../../providers/getlocation';
import { Http } from '@angular/http';
import { PopoverController } from 'ionic-angular';
import  keyword_extractor  from 'keyword-extractor';
import { PhotoViewer } from '@ionic-native/photo-viewer';

declare var google;
/**
 * Generated class for the Reviews page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class Reviews {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    public positionKeyword: number;
    public service;
    public latitude: number;
    public longitude: number;
    public autocompleteService: any;
    public placesService: any;
    public query: string = '';
    public places: any = [];
    public listPlaces:  Array<{date: any, cuvinte: any}> = [];
    public cuvinte: any = [];
    public searchDisabled: boolean;
    public saveDisabled: boolean;
    public routeDisabled: boolean;
    public location: any;  
    public autocompleteItems:any = [];
    public autocomplete:any = [];
    public descriptions:any = [];
    public markerArray: any[] = [];
    public markerArrayy: any[] = [];
    private marker: any ;
    private infoWindow: any; 
    private typeOfPlace: any = 'hotel';
    public restartMap: any;
    public map: any;
    public website: string = '';
    public dataPlace: any = [];
    public directionDisplay: any;
    public directionService: any;
    public mySlideOptions = {
                              pager:true
                            };    
    public showReviews: boolean = true;
    public reviewArray: any = [];
    constructor(public navCtrl: NavController,
 //   private photoViewer: PhotoViewer,
                public alertCtrl: AlertController, 
                public toastCtrl: ToastController,
                private diagnostic: Diagnostic,
                public zone: NgZone,
                public maps: GoogleMaps, 
                public http: Http,
                public platform: Platform,
                public geolocation: Geolocation, 
                public getlocation: Getlocation,
                public popoverCtrl: PopoverController,
                
                public viewCtrl: ViewController) {
             let     sentence = "President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency."
 

let extraction_result = keyword_extractor.extract(sentence,{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: false
 
                                                           });
                                                           console.log(extraction_result)
        this.getlocation.startTracking();
        this.autocompleteItems = [];
          this.descriptions = [];
          this.autocomplete = {
            query: ''
        };
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.routeDisabled = true;

    }
 
  loadSetGoogle() {
    let confirm = this.alertCtrl.create({
      title: 'Nu s-a putut determina locatia',
      message: 'Pentru a putea obtine locatia curenta va rugam sa activati GPS cu optiunea de precizie ridicata!',
      buttons: [
        {
          text: 'Renunta',
          handler: () => {
            this.toastCtrl.create({
              message: 'Nu s-a putut determina locatia cu acuratete maxima !',
              duration: 3000
            }).present();
          }
        },
        {
          text: 'Activeaza',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    confirm.present();
  }


  public ionViewCanEnter() {
    
    let successCallback = (isAvailable) => { if(!isAvailable) { this.loadSetGoogle(); }  };
    let errorCallback = (e) => console.log(e);
    this.diagnostic.isGpsLocationAvailable().then(successCallback).catch(errorCallback);
       this.getlocation.startTracking();
  //  this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);
  }

    public ionViewDidLoad(): void {
 
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
            this.infoWindow =  new google.maps.InfoWindow;
            this.service = new google.maps.places.AutocompleteService();
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
            this.routeDisabled = false;
               this.getlocation.startTracking();
          
        }); 
           
    }

    public ionViewWillUnload(): void {
      this.getlocation.stopTracking();
    }
    public showPhoto(src) {
      //this.photoViewer.show(src);
    }
    public setMap() {
      this.getlocation.startTracking();
      this.showReviews=false;
      function  dothat(data) {
              alert(data)
            }
            this.directionDisplay = new google.maps.DirectionsRenderer({map:this.maps.map});
            this.directionService = new google.maps.DirectionsService;
            let me = this;
            for(let i = 0; i < this.markerArray.length; i++) {
              this.markerArray[i].setMap(null);
            }
            this.infoWindow =  new google.maps.InfoWindow;
            this.map = this.maps.map;
            let myLocation = new google.maps.LatLng(this.getlocation.lat, this.getlocation.lng);
            console.log(myLocation)
            this.marker = new google.maps.Marker({map:me.map,position:myLocation})
            google.maps.event.addListener(me.marker, 'click', function() {
                me.infoWindow.setContent('My Location !');
                me.infoWindow.open(me.map, this);
            })

            me.infoWindow.setContent('My location !');
            me.infoWindow.open(me.map, this.marker);
            let service = new google.maps.places.PlacesService(me.map);
                service.nearbySearch({
                location: myLocation,
                radius: 1000,
                type: me.typeOfPlace
                }, callback);
                
            
            function callback(results, status) {
                console.log(results.length)
                if(status === google.maps.places.PlacesServiceStatus.OK) {
                    for(let i = 0; i < results.length; i++) {
                        let serviceDetails = new google.maps.places.PlacesService(me.map);
                        serviceDetails.getDetails({
                          placeId: results[i].place_id
                        },createMarker);
                    }
                 }
            }

          

            function createMarker(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    let service = new google.maps.places.PlacesService(me.map);
                        //   console.log( place);
                        let pointB = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                        let pointA = new google.maps.LatLng(me.getlocation.lat, me.getlocation.lng);
                        let marker = new google.maps.Marker({
                            map:me.map,
                            position: place.geometry.location,
                            zIndex:99999999
                        });
                        me.markerArray.push(marker);
                        //  console.log(place)
                          console.log(place.website)
                         
                                 let contentString:string = `<img style="width:24px;height:24px;" src =`+place.icon+` /><br>
                                <strong> Info : </strong> `+place.name+`<br>
                                <strong> Address : </strong>`+place.vicinity+`<br>`+`
                                <strong> Website : </strong> <a href=`+place.website +`> Link to website _  `+place.website +` </a> 
                                
                               <input type="button"  onClick=dothat(place.website) />
                               
                               `;

             
                        
                        // <strong> Photos: <img src=`+ place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})+`><br>`+
                        // `<strong> Open now:</strong> `+place.opening_hours.open_now+ `<br>
                        // <strong> Rating: </strong>` +place.rating;
                        let oneText = 0;
                        let oneNoText = 0;
                        try {
                          
                        for( let i = 0; i < place.reviews.length; i++) {
                            if(place.reviews[i].language == "en" && oneText == 0  ) {
                                 me.listPlaces.push({date:place,cuvinte:keyword_extractor.extract(place.reviews[i].text,{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: true
 
                                                           })});
                                                           oneText = 1;
                                                           oneNoText = 1;
                            } else if(place.reviews[i].language == "ro" && oneNoText == 0 ) {
                                me.listPlaces.push({date:place,cuvinte:keyword_extractor.extract('no keyword',{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: true
 
                                                           })});
                                                           oneNoText = 1;
                            }
                        }
                       
                        
                        }
                        catch(e) {
                          
                            me.listPlaces.push({date:place,cuvinte:keyword_extractor.extract('',{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_chained_words:true,
                                                                return_changed_case:true,
                                                                remove_duplicates: true
 
                                                           })});
                       // go//ogle.maps.event.addListener(marker, 'click', function() {
                        //me.infoWindow.setContent(contentString);
                      //  me.googlePopUp(place);
                        me.infoWindow.open(me.map, this);
                     //   me.calculateAndDisplayRoute(me.directionDisplay, me.directionService, me.infoWindow, me.map, pointA, pointB);
                    
                        // this.http.get('http://atestate-inf.tk/ghidtest/date.php?user='+
                        //  localStorage.getItem('user')+'&lat='+position.coords.latitude
                        //  +'&lng='+position.coords.longitude
                        //  +'&speed='+ position.coords.speed).map(res => res.json()).subscribe(data => { });
                            // Run update inside of Angular's zone
                            // 	this.zone.run(() => {
                                // this.lat = position.coords.latitude;
                            // 	this.lng = position.coords.longitude;
                            // });
                        me.marker.setMap(null)
                        me.marker = new google.maps.Marker({map: me.map, position:myLocation})
                        me.saveDisabled = false;
                      //  me.calculateAndDisplayRoute(me.directionDisplay, me.directionService, me.infoWindow, me.map, pointA, pointB);
                        me.dataPlace = place;

                      }
                     //s   this.reviewArray = [];
                }    
       
            }
                 
             
            
    }

    public googlePopUp(place) {
        let popover = this.popoverCtrl.create('Googlepopover',{ place:place });
        popover.present();
    }

    public selectPlace(place) {
 
        this.places = [];
        let me = this;
        let location = {
            lat: null,
            lng: null,
            name: place.name
        };
        let stepDisplay = new google.maps.InfoWindow;

        this.placesService.getDetails({placeId: place.place_id}, (details) => {
 
            this.zone.run(() => {
 
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;
                this.routeDisabled = false;
                
                this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 
                 let marker = new google.maps.Marker;
                    marker.setMap(null)
                    marker.setMap(me.maps.map);
                    marker.setPosition({lat: location.lat, lng: location.lng});
                    google.maps.event.addListener(marker, 'click', function() {
                    stepDisplay.setContent(location.name);
                    stepDisplay.open(me.maps.map, marker);
                  })
                this.location = location;
 
            });
 
        });
 
    }
 
    public searchPlace(){
 
        this.saveDisabled = true;
        this.routeDisabled = true;
        
        if(this.query.length > 0 && !this.searchDisabled) {
 
            let config = {
                types: ['geocode'],
                input: this.query
            }
 
            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
 
                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
 
                    this.places = [];
                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                    });
                }
 
            });
 
        } else {
            this.places = [];
        }
 
    }
 
    public save(place, placeLat, placeLng){
//                    me.save(place.vicinity, place.geometry.location.lat(), place.geometry.location.lng())
                      this.showPrompt();
    }
 
    public close(){
        //nothing
    }   

    /**
   * startNavigating
   */
  public startNavigating() {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
                     
 
        directionsDisplay.setMap(this.maps.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);
        directionsService.route({
          origin:  new google.maps.LatLng( this.getlocation.lat, this.getlocation.lng ),
            destination:new google.maps.LatLng( this.location.lat, this.location.lng ),
            travelMode: google.maps.TravelMode['WALKING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
 
        });
 
  }

  
  public  changeTypeOfPlace() {
    //this.setMap()
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose place type:');

    alert.addInput({
      type: 'radio',
      label: 'Store',
      value: 'store',
      checked:true
    });

    alert.addInput({
      type: 'radio',
      label: 'School',
      value: 'school',
    });

    alert.addInput({
      type: 'radio',
      label: 'University',
      value: 'university',
    });

    alert.addInput({
      type: 'radio',
      label: 'Hospital',
      value: 'hospital',
    });

    alert.addInput({
      type: 'radio',
      label: 'Park',
      value: 'park',
    });
    
    alert.addInput({
      type: 'radio',
      label: 'Hotel',
      value: 'hotel',
    });

    alert.addInput({
      type: 'radio',
      label: 'Pharmacy',
      value: 'pharmacy',
    });

    alert.addInput({
      type: 'radio',
      label: 'Police',
      value: 'police',
    });
    
    alert.addInput({
      type: 'radio',
      label: 'Restaurant',
      value: 'restaurant',
    });

    alert.addInput({
      type: 'radio',
      label: 'Transit station',
      value: 'transit_station',
    });

    alert.addInput({
      type: 'radio',
      label: 'ATM bank',
      value: 'atm',
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {

        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
            this.infoWindow =  new google.maps.InfoWindow;
            this.service = new google.maps.places.AutocompleteService();
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
            this.routeDisabled = false;
                this.typeOfPlace = false;
        this.typeOfPlace = data;
        console.log(data);
        for(let i = 0; i < this.markerArray.length; i++) {
          this.markerArray[i].setMap(null);
        }
     //   this.directionsDisplay.setDirections(null);
        this.marker.setMap(null);
        this.setMap()
        console.log(this.typeOfPlace)
           
        }); 
      //  this.saveRoute = true;
    
      }
    });
    alert.present();
  }
   /**
  * 
  * @param address 
  * @param lat 
  * @param lng 
  */
  private showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Locatie',
      message: "Seteaza un nume pentru aceasta locatie !",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save ',
          handler: data => {
           if(data.title && this.dataPlace != []) {
              console.log(this.dataPlace)
              this.http.get('http://hainedefirmasj.com/placesforme//sendData.php?user='+localStorage.getItem('user')
                            +'&lat='+this.dataPlace.geometry.location.lat()
                            +'&lng='+this.dataPlace.geometry.location.lng()
                            +'&address='+this.dataPlace.vicinity
                            +'&location='+data.title).
              map(res=>res.json()).
              subscribe(data);
            } else if( this.dataPlace != [] ) {
              this.http.get('http://hainedefirmasj.com/placesforme//sendData.php?user='+localStorage.getItem('user')
                            +'&lat='+this.dataPlace.geometry.location.lat()
                            +'&lng='+this.dataPlace.geometry.location.lng()
                            +'&address='+this.dataPlace.vicinity
                            +'&location='+this.dataPlace.vicinity).
              map(res=>res.json()).
              subscribe(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }


   /**
   * 
   * @param directionDisplay 
   * @param directionService 
   * @param stepDisplay 
   * @param map 
   * @param pointA 
   * @param pointB 
   */
  public calculateAndDisplayRoute(directionDisplay, directionService, stepDisplay, map, pointA, pointB) {
 //   console.log('da')
    let me = this;
    directionService.route({
        origin:pointA,
        destination:pointB,
        travelMode:'WALKING'
    }, function(response, status) {
          if(status === 'OK') {
            //console.log(response)
               directionDisplay.setDirections(response);
              //  directionDisplay.setPanel(null);
              //  directionDisplay.setPanel(me.directionsPanel.nativeElement);
               
              //  //directionDisplay.setPanel(document.getElementById('right'));
              //  /**
              //   * sectiunea urmatoare va genera indicatii pe traseu
              //   */
              //  let myRoute = response.routes[0].legs[0];
              //   for(let i = 0; i < myRoute.steps.length; i++) {
              //       let marker = me.markerArrayy[i] = me.markerArrayy[i] || new google.maps.Marker;
              //       marker.setMap(map);
              //       marker.setPosition(myRoute.steps[i].start_location);
              //       google.maps.event.addListener(marker, 'click', function() {
              //       stepDisplay.setContent(myRoute.steps[i].instructions);
              //       stepDisplay.open(map, marker);
              //     })
              //  }
          } else {
            alert('Error'+status);
          }
    });
  }
 
}