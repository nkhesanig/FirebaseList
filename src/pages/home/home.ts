import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  name;
  items=[];


  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    this.updateData();
  }

  updateData(){
    this.items=[];
    firebase.database().ref('/cuisine/').on("value",(snapshot) =>{
      snapshot.forEach((snap) =>{

        this.items.push({key : snap.key, name :snap.val()});
        return false;

      })
    });
  }

  writecuisine(){

    this.items=[]
    console.log(this.name);
    var database = firebase.database();
    database.ref('/cuisine/').push( this.name);
    this.updateData();
    console.log(this.items);
    
  }

  
  delete(key){
   
    var database = firebase.database();
    database.ref('/cuisine/' + key).remove();
    this.updateData();
  }

  update(key){
    
    var database = firebase.database();
    database.ref('/cuisine/'+ key).set(this.name);
    this.updateData();
  }

}
