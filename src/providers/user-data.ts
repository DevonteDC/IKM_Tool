import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {
  public uid: any;
  public user: any;
  public app:any;
  public email;
  public appName;
  public questions;
  public userName = "Devonte";

  constructor() {
    if(firebase.auth().currentUser){
        this.refreshUid();
    }

    this.appName = "IKM_Tool";


  }

  refreshUid(){
    this.uid = firebase.auth().currentUser.uid;
    this.email = firebase.auth().currentUser.email;
    this.user = firebase.database().ref('/users/' + this.uid);
    this.app = firebase.database().ref("/users/" + this.uid + "/" + this.appName);
    this.questions = firebase.database().ref("/questions");



  }

  pushQuestionToDatabase(category,topic,question,numberOfQuestions){
    let key = firebase.database().ref("/questions/" + category + "/" + topic + "/").push(question).key;
    firebase.database().ref("/questions/" + category + "/" + topic + "/" + key + "/").update({key:key});
    firebase.database().ref("/questions/" + category + "/" + topic).update({numberOfQuestions:numberOfQuestions});
    firebase.database().ref("/users/" + this.userName + "/questions/" + category + '/' + topic + '/' + key +"/").update(question);
    firebase.database().ref("/users/" + this.userName + "/questions/" + category + '/' + topic + '/' + key +"/").update({key:key});
  }













}
