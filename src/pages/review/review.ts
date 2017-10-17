import { Component,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {HomePage} from '../home/home';
import firebase from 'firebase';
/**
 * Generated class for the Review page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class Review {
  questionPackage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public userData:UserData,public zone:NgZone) {
    this.questionPackage = navParams.get("questionPackage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Review');
  }

  Edit(index){
    this.viewCtrl.dismiss({index:'edit'});
  }

  submitQuestions(){
    let me = this;
    firebase.database().ref("questions/" + this.questionPackage.category + "/" + this.questionPackage.topic + "/numberOfQuestions").once("value",function(snapshot){
      me.zone.run(function(){
          me.userData.pushQuestionToDatabase(me.questionPackage.category,me.questionPackage.topic,me.questionPackage,snapshot.val() + 1);
      })
    })


    this.viewCtrl.dismiss({index:null});
    this.navCtrl.setRoot(HomePage);


  }

}
