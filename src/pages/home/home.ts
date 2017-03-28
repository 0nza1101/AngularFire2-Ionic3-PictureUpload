import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

import { PictureUtils } from '../../services/pictureUtils.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userAvatarPicture: Array<any> = new Array;//User picture array because of random name
  constructor(public platform: Platform, public af: AngularFire, public actionSheetCtrl: ActionSheetController, private pictureUtils: PictureUtils) {

  }

  refreshPicture() {
    this.af.database.list('TEST/avatar/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.userAvatarPicture[index] = snapshot.val();
      });
    });
  }

  changePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.pictureUtils.openCamera().then((imageData) => {
              this.pictureUtils.uploadProfilPicture(imageData);
            });
          }
        }, {
          text: 'From gallery',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.pictureUtils.openGallery().then((imageData) => {
              this.pictureUtils.uploadProfilPicture(imageData);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }


}
