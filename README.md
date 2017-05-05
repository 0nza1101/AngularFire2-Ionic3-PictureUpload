Simple app exemple showing how to upload image from gallery or from camera to Firebase.

<p align="center">
  <img src="https://j.gifs.com/Y693g0.gif" />
</p>

If you want test the project first type :
```
npm install
```
***Don't forget to change firebaseConfig in /src/app/app.module.ts***
```javascript
    export const firebaseConfig = {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_DOMAIN',
      databaseURL: 'YOUR_DATABASE_URL',
      storageBucket: 'YOUR_STORAGE'
    };
```  
Make sure you have installed the Android SDK 

Then install platform with 
```
ionic platform add android
ionic plugin add cordova-plugin-camera
npm install --save @ionic-native/camera
```
or make sure you have installed Xcode

**Only** if your are on iOS
```
ionic platform add ios
ionic plugin add cordova-plugin-camera
npm install --save @ionic-native/camera
```

You should also have these Firebase rules, **for test purposes only dont go into production with these rules** :

**Realtime database rules :**

    {
      "rules": {
        ".read": true,
        ".write": true
      }
    }


**Storage rules :**

    service firebase.storage {
      match /b/XXXXXXXXX.appspot.com/o {
        match /{allPaths=**} {
          allow read, write;
        }
      }
    }

They mean you can push data to firebase database without being logged in.
