import { Component } from '@angular/core';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { PictureUtils } from '../../services/pictureUtils.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private userAuth: any;
  private pictures: any[];

  constructor(
    private afDB: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController,
    private pictureUtils: PictureUtils) {

  }

  ionViewDidLoad() {
    // we will use anonymous auth turn it on on firebase
    firebase.auth().signInAnonymously().then(auth => {
        // when authenticated... alert the user
        console.log('login success');
        this.userAuth = auth;
      })
      .catch((error: Error) => {
        // Handle Errors here.
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  refreshPicture(): void {
    var result = [];
    // load data from firebase...
    firebase.database().ref('assets').orderByKey().once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot) => {
        // get the key/id and the data for display
        var element = childSnapshot.val();
        element.id = childSnapshot.key;
        result.push(element);
      });
      this.pictures = result;
    });
  }

  changePicture(): void {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.pictureUtils.uploadFromCamera();
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.pictureUtils.uploadFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }


}
