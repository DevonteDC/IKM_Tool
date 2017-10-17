import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Login} from '../pages/login/login';
import {Signup} from '../pages/signup/signup';
import {ResetPassword} from '../pages/reset-password/reset-password';
import {QuestionEditModal} from '../pages/question-edit-modal/question-edit-modal';
import {AnswerEditModal} from '../pages/answer-edit-modal/answer-edit-modal';
import {AuthData} from '../providers/auth-data';
import {UserData} from '../providers/user-data';
import {Time} from '../providers/time';
import {Review} from '../pages/review/review';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Signup,
    ResetPassword,
    QuestionEditModal,
    AnswerEditModal,
    Review
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Signup,
    ResetPassword,
    QuestionEditModal,
    AnswerEditModal,
    Review
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Time,
    AuthData,
    UserData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
