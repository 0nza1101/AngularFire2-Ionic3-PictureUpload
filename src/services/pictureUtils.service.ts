import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import { Camera } from 'ionic-native';

/***
    PictureUtils.ts a provider picture manipulating methods with :
      - openCamera() return a promise with the image taken from the camera
      - openGallery() return a promise with the image picked from the gallery
      - uploadProfilPicture(imgData:any) upload to firebase storage current user picture
***/

@Injectable()
export class PictureUtils {
  storageAvatarRef: any;
  profilAvatarRef: any;
  objectToSave: Array<any> = new Array;

  takePictureOptions: any = {
    allowEdit: true,
    saveToPhotoAlbum: true,
    quality: 100,
    targetWidth: 720,
    targetHeight: 720,
    cameraDirection: Camera.Direction.BACK,
    sourceType: Camera.PictureSourceType.CAMERA,
    mediaType: Camera.MediaType.PICTURE,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG
  }

  galleryOptions: any = {
    allowEdit: true,
    saveToPhotoAlbum: false,
    quality: 100,
    targetWidth: 720,
    targetHeight: 720,
    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
    mediaType: Camera.MediaType.PICTURE,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG
  }

  constructor(public afDB: AngularFireDatabase) {
    this.storageAvatarRef = firebase.storage().ref().child('userPicture/');//Firebase storage main path
    this.profilAvatarRef = afDB.object('TEST/avatar/');//Firebase user database avatar path
  }

  //Take a picture and return a promise with the image data
  openCamera() {
    return new Promise((resolve, reject) => {
      Camera.getPicture(this.takePictureOptions).then((imageData) => {
        return resolve(imageData);
      }), (err) => {
        console.log('Cant take the picture', err);
        return reject(err);
      }
    });
  }

  //open the gallery and Return a promise with the image data
  openGallery() {
    return new Promise((resolve, reject) => {
      Camera.getPicture(this.galleryOptions).then((imageData) => {
        return resolve(imageData);
      }), (err) => {
        console.log('Cant access to gallery', err);
        return reject(err);
      }
    });
  }

  //Upload a new profile picture to the firebase storage
  uploadProfilPicture(imgData: any) {
    var randomNumber = Math.floor(Math.random() * 256);
    console.log('Random number : ' + randomNumber);

    this.storageAvatarRef.child(randomNumber + '.jpg').putString(imgData, 'base64', { contentType: 'image/jpeg' }).then((savedPicture) => {
      console.log('saved picture URL', savedPicture.downloadURL);

      this.objectToSave.push(savedPicture.downloadURL);
      console.log('objectToSave : ' + JSON.stringify(this.objectToSave));
      this.profilAvatarRef.set(this.objectToSave);
    });
  }

  //Delete avatar picture GIFT :)
  deleteAvatar(imgIndex: string) {
    this.storageAvatarRef.child(imgIndex + '.jpg').delete().then((success) => {
      console.log('Deleted users avatar successfully', imgIndex);
    }, (error) => {
      console.error("Error deleting users avatar", imgIndex)
    });
  }


}
