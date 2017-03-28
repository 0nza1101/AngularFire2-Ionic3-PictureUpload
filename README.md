# firebaseCameraApp

Simple app exemple showing how to upload image from gallery or from camera to Firebase.

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

Then remove and reinstall platform with 
```
ionic platform remove android
ionic platform add android
```
or make sure you have installed Xcode

**Only** if your are on iOS
```
ionic platform remove ios
ionic platform add ios
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
